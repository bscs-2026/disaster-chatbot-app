import { useState, useRef } from "react";
import { KeyboardAvoidingView, Platform, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SubmitBtn } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MessageBubble } from "../components/ui/messagebubble";

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
          text: "Got it! 👍",
          sender: "bot",
        },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
      className="flex-1 bg-gray-50"
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
