import { useState, useRef } from "react";
import { KeyboardAvoidingView, Platform, FlatList, View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SubmitBtn } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MessageBubble } from "../components/ui/messagebubble";
import { SuggestedPrompts } from "../components/ui/suggestedprompts";
import { askGPT4o, askLlamaRAG, askGPT4oRAG, askLlama } from "../lib/api";

export default function Chat() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ id: string; text: string; sender: "user" | "bot" }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"llama" | "gpt4o" | "llamarag" | "gpt4orag">("llama");
  const [hasChatted, setHasChatted] = useState(false);

  const handleSend = () => {
    if (!text.trim() || loading) return;

    const newMsg = { id: Date.now().toString(), text, sender: "user" as const };
    setMessages((prev) => [...prev, newMsg]);
    setText("");
    setLoading(true);
    setHasChatted(true);

    (async () => {
      try {
        let res;
        switch (mode) {
          case "llamarag":
            res = await askLlamaRAG(text);
            break;
          case "gpt4o":
            res = await askGPT4o(text);
            break;
          case "gpt4orag":
            res = await askGPT4oRAG(text);
            break;
          default:
            res = await askLlama(text);
        }

        const botReply = res?.answer || res?.response || JSON.stringify(res, null, 2);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: botReply,
            sender: "bot",
          },
        ]);
      } catch (e: any) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: `⚠️ Error: ${e?.message || e}`,
            sender: "bot",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  };

  const prompts = [
    {
      heading: "Ask if there is current flood",
      question: "Is there flood happening near me?",
    },
    {
      heading: "Earthquake safety",
      question: "What should I do during an earthquake?",
    },
    {
      heading: "Evacuation info",
      question: "Where is the nearest evacuation center?",
    },
    {
      heading: "Landslide tips",
      question: "What should I do after a landslide?",
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
      className="flex-1 bg-white"
    >
      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble text={item.text} sender={item.sender} />}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View
        className="px-2"
        style={{
          marginBottom: hasChatted ? 4 : 8,
          paddingBottom: hasChatted ? 0 : insets.bottom,
        }}
      >
        {/* Suggested Prompts */}
        {!hasChatted && <SuggestedPrompts prompts={prompts} onSelect={setText} />}

        {/* Model selector */}
        <View className="mt-2 flex-row flex-wrap justify-center">
          {[
            { id: "llama", label: "LLaMA" },
            { id: "llamarag", label: "LLaMA-RAG" },
            { id: "gpt4o", label: "GPT-4o" },
            { id: "gpt4orag", label: "GPT-4o-RAG" },
          ].map((m) => (
            <Pressable
              key={m.id}
              onPress={() => setMode(m.id as any)}
              className={`m-1 rounded-full px-3 py-2 ${
                mode === m.id ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text className={mode === m.id ? "font-semibold text-white" : "text-black"}>
                {m.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Composer */}
      <View style={{ paddingBottom: insets.bottom + 12 }} className="px-4">
        <View className="flex-row items-center rounded-full bg-white px-3 py-3 shadow-lg">
          <Input
            placeholder="How can I help you with disaster today?"
            maxRows={5}
            className="mr-2 flex-1"
            value={text}
            onChangeText={setText}
            editable={!loading}
          />

          {/* Pass correct variant */}
          <SubmitBtn
            variant={loading ? "loading" : !text.trim() ? "disabled" : "default"}
            onPress={handleSend}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
