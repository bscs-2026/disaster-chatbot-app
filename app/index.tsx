import { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SubmitBtn } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Chat() {
  const insets = useSafeAreaInsets();

  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    console.log("Sent:", text);

    // reset input
    setText("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
      className="flex-1 bg-gray-50"
    >
      {/* Messages area */}
      <View className="flex-1" />

      {/* Floating Composer */}
      <View style={{ paddingBottom: insets.bottom + 12 }} className="px-4">
        <View className="flex-row items-center rounded-full bg-white px-3 py-2 shadow-lg">
          <Input
            placeholder="Type a message..."
            maxRows={5}
            className="mr-2 flex-1"
            value={text}
            onChangeText={setText}
          />
          <SubmitBtn variant="default" onPress={handleSend} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
