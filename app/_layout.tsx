import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Drawer
        screenOptions={{
          headerShown: true,
          headerTitle: "DisasterReady AI",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
          headerTintColor: "black",
        }}
      >
        <Drawer.Screen name="index" options={{ title: "Chat" }} />
        <Drawer.Screen name="hotlines" options={{ title: "Disaster Hotlines" }} />
      </Drawer>
    </SafeAreaProvider>
  );
}
