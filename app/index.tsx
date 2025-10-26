import { useState, useRef } from "react";
import { KeyboardAvoidingView, Platform, FlatList, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SubmitBtn } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MessageBubble } from "../components/ui/messagebubble";
import { SuggestedPrompts } from "../components/ui/suggestedprompts";
import { chatRAG } from "../lib/api";
import { cn } from "../lib/utils";

export default function Chat() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ id: string; text: string; sender: "user" | "bot" }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [hasChatted, setHasChatted] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || loading) return;

    const newMsg = { id: Date.now().toString(), text, sender: "user" as const };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setText("");
    setLoading(true);
    setHasChatted(true);

    try {
      const chatHistory = updatedMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await chatRAG(chatHistory);
      const botReply = res.answer;

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: botReply, sender: "bot" },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: `⚠️ Error: ${e?.message || e}`, sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const prompts = [
    {
      heading: "Ask if there is current flood",
      question: "Is there flood happening in Davao City right now?",
    },
    {
      heading: "Earthquake safety",
      question: "What should I do during an earthquake?",
    },
    {
      heading: "Disaster preparedness",
      question: "What should I do to prepare for a disaster?",
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
      style={{ backgroundColor: isDark ? "#000" : "#fff" }}
    >
      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble text={item.text} sender={item.sender} />}
        contentContainerStyle={{
          padding: 12,
          paddingBottom: insets.bottom + 80,
        }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View
        className="px-2"
        style={{
          marginBottom: hasChatted ? 4 : 8,
          paddingBottom: 4,
        }}
      >
        {/* Suggested Prompts */}
        {!hasChatted && <SuggestedPrompts prompts={prompts} onSelect={setText} />}
      </View>

      {/* Composer */}
      <View style={{ paddingBottom: insets.bottom + 12 }} className="px-4">
        <View
          className={cn(
            "flex-row items-center rounded-full px-3 py-3 shadow-lg",
            isDark ? "bg-neutral-900" : "bg-white"
          )}
        >
          <Input
            placeholder="How can I help you with disaster today?"
            maxRows={5}
            className="mr-2 flex-1"
            value={text}
            onChangeText={setText}
            editable={!loading}
          />
          <SubmitBtn
            variant={loading ? "loading" : !text.trim() ? "disabled" : "default"}
            onPress={handleSend}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
