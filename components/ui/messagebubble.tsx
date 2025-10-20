import { View, Text, useColorScheme, Pressable, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import Markdown from "react-native-markdown-display";

type MessageBubbleProps = {
  text: string;
  sender: "user" | "bot";
};

export function MessageBubble({ text, sender }: MessageBubbleProps) {
  const isUser = sender === "user";
  const colorScheme = useColorScheme();

  const markdownStyle: Record<string, any> = {
    body: { fontSize: 16, lineHeight: 22 },
    strong: { fontWeight: "700" },
    bullet_list_icon: { color: "#2563eb" },
    list_item: { marginBottom: 6 },
    paragraph: { marginBottom: 8 },
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(String(text || ""));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Copied to Clipboard");
  };

  const userTextColor = "white";
  const botTextColor = colorScheme === "dark" ? "white" : "black";

  // User prompt
  if (isUser) {
    return (
      <View className="my-1 max-w-[75%] self-end rounded-3xl bg-blue-500 px-4 py-2 shadow">
        <Text selectable style={{ color: userTextColor, fontSize: 16, lineHeight: 22 }}>
          {String(text || "")}
        </Text>
      </View>
    );
  }

  // Bot answer
  return (
    <Pressable onLongPress={handleCopy} delayLongPress={300}>
      <View className="my-2 max-w-[90%] self-start rounded-2xl px-4 py-3">
        <Text selectable>
          <Markdown
            style={{
              ...markdownStyle,
              body: { ...markdownStyle.body, color: botTextColor },
            }}
          >
            {String(text || "")}
          </Markdown>
        </Text>
      </View>
    </Pressable>
  );
}
