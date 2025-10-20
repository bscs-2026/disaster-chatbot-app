import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

export async function getHealth() {
  const { data } = await api.get("/health");
  return data;
}

export async function searchPosts(q: string, top_k = 5) {
  const { data } = await api.get("/search", { params: { q, top_k } });
  return data;
}

// export async function askLlama(q: string) {
//   const { data } = await api.get("/llama/llm-only", { params: { q } });
//   return data;
// }

// export async function askGPT4o(q: string) {
//   const { data } = await api.get("/gpt-4o-mini/llm-only", { params: { q } });
//   return data;
// }

// export async function askLlamaRAG(q: string) {
//   const { data } = await api.get("/llama/rag", { params: { q } });
//   return data;
// }

export async function askGPT4oRAG(q: string) {
  const { data } = await api.get("/gpt-4o-mini/rag", { params: { q } });
  return data;
}

export async function chatRAG(messages: { role: string; content: string }[]) {
  const { data } = await api.post("/chat/rag", { messages });
  return data;
}
