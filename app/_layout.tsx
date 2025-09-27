import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "DisasterReady AI",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#0000" },
          headerTintColor: "black",
        }}
      />
    </SafeAreaProvider>
  );
}
