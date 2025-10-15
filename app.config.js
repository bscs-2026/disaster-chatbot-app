import "dotenv/config";

export default {
  expo: {
    name: "disaster-chatbot-app",
    slug: "disaster-chatbot-app",
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};
