import API from "../lib/api";

export async function sendMessage(message: string) {
  const res = await API.post("/chat", { message });
  return res.data; // expect { reply: "..." }
}
