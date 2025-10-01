import { View, Text } from "react-native";
import React from "react";
import { cn } from "../lib/utils";

type MessageBubbleProps = {
  text: string;
  sender: "me" | "bot";
};

export function MessageBubble({ text, sender }: MessageBubbleProps) {
  const isMe = sender === "me";

  if (isMe) {
    // User bubble (blue)
    return (
      <View className="my-1 max-w-[75%] self-end rounded-2xl bg-blue-500 px-4 py-2 shadow">
        <Text className="text-[16px] text-white">{text}</Text>
      </View>
    );
  }

  // Bot plain text (no bubble)
  return (
    <View className="my-2 max-w-[90%] self-start">
      <Text className="text-[16px] leading-6 text-black dark:text-white">{text}</Text>
    </View>
  );
}
