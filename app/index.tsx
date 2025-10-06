import { useState, useRef } from "react";
import { KeyboardAvoidingView, Platform, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SubmitBtn } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MessageBubble } from "../components/ui/messagebubble";
import { SuggestedPrompts } from "../components/ui/suggestedprompts";

export default function Chat() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ id: string; text: string; sender: "me" | "bot" }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!text.trim() || loading) return;

    const newMsg = { id: Date.now().toString(), text, sender: "me" as const };
    setMessages((prev) => [...prev, newMsg]);
    setText("");
    setLoading(true);

    // Fake bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
          sender: "bot",
          xs,
        },
      ]);
      setLoading(false);
    }, 2000);
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

      {/* Suggested Prompts */}
      <View className="px-2" style={{ paddingBottom: insets.bottom }}>
        <SuggestedPrompts prompts={prompts} onSelect={setText} />
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
