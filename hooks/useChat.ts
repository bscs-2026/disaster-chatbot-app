import { useState } from "react";
import { sendMessage } from "../services/chat";

type ChatMessage = { role: "user" | "bot"; text: string };

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim()) return;

    // add user message
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await sendMessage(text);
      setMessages((prev) => [...prev, { role: "bot", text: res.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "❌ Error connecting to AI" }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, send, loading };
}
