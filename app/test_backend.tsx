import { useState } from "react";
import { ScrollView, Text, Button, View } from "react-native";
import { getHealth, askGPT4o, askLlamaRAG, searchPosts } from "../lib/api";

export default function TestBackend() {
  const [output, setOutput] = useState<any>(null);

  const testHealth = async () => setOutput(await getHealth());
  const testGPT = async () => setOutput(await askGPT4o("Hello from Expo app!"));
  const testLlama = async () => setOutput(await askLlamaRAG("Hello from Expo app!"));
  const testSearch = async () => setOutput(await searchPosts("flood in Davao"));

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Backend Test</Text>
      <Button title="Health Check" onPress={testHealth} />
      <View style={{ height: 8 }} />
      <Button title="Test GPT-4o-mini" onPress={testGPT} />
      <View style={{ height: 8 }} />
      <Button title="Test Llama rag" onPress={testLlama} />
      <View style={{ height: 8 }} />
      <Button title="Search Posts" onPress={testSearch} />

      <Text selectable style={{ marginTop: 16 }}>
        {JSON.stringify(output, null, 2)}
      </Text>
    </ScrollView>
  );
}
