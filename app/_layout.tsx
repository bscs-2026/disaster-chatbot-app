import { Stack } from "expo-router";
import "../global.css"; // keep if you use NativeWind/Tailwind

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
