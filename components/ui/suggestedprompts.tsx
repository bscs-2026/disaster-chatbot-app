import { View, Text, Pressable, ScrollView } from "react-native";

type Prompt = {
  heading: string;
  question: string;
};

type SuggestedPromptsProps = {
  prompts: Prompt[];
  onSelect: (prompt: string) => void;
};

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-2"
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
      }}
    >
      {prompts.map((prompt, idx) => (
        <Pressable
          key={idx}
          onPress={() => onSelect(prompt.question)}
          className="rounded-2xl bg-white px-4 py-3 shadow-sm active:bg-gray-200"
        >
          {/* Heading */}
          <Text className="text-sm font-semibold text-gray-900">{prompt.heading}</Text>
          {/* Question */}
          <Text className="text-sm text-gray-600">{prompt.question}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
