import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />

      <Drawer
        screenOptions={{
          headerShown: true,
          headerTitle: "DisasterReady AI",
          headerTitleAlign: "center",

          // 🖤 Header background + text colors
          headerStyle: {
            backgroundColor: isDark ? "#121212" : "white",
          },
          headerTintColor: isDark ? "white" : "black",

          // 🧭 Drawer background + label colors
          drawerStyle: {
            backgroundColor: isDark ? "#000" : "#fff",
          },
          drawerActiveTintColor: isDark ? "#60a5fa" : "#2563eb",
          drawerInactiveTintColor: isDark ? "#fff" : "#444",
        }}
      >
        <Drawer.Screen name="index" options={{ title: "Chat" }} />
        <Drawer.Screen name="hotlines" options={{ title: "Disaster Hotlines" }} />
        <Drawer.Screen name="test_backend" options={{ title: "[DEBUGGING] Backend Test" }} />
      </Drawer>
    </SafeAreaProvider>
  );
}
