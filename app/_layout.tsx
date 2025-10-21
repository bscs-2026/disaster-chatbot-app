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
      {/* Status bar should be inside but not a sibling of Drawer */}
      <Drawer
        screenOptions={{
          headerShown: true,
          headerTitle: "DisasterReady AI",
          headerTitleAlign: "center",

          // Header colors
          headerStyle: {
            backgroundColor: isDark ? "#121212" : "white",
          },
          headerTintColor: isDark ? "white" : "black",

          // Drawer colors
          drawerStyle: {
            backgroundColor: isDark ? "#000" : "#fff",
          },
          drawerActiveTintColor: isDark ? "#60a5fa" : "#2563eb",
          drawerInactiveTintColor: isDark ? "#fff" : "#444",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Chat",
            headerRight: () => <StatusBar style={isDark ? "light" : "dark"} />,
          }}
        />
        <Drawer.Screen
          name="hotlines"
          options={{
            title: "Disaster Hotlines",
            headerRight: () => <StatusBar style={isDark ? "light" : "dark"} />,
          }}
        />
        <Drawer.Screen
          name="test_backend"
          options={{
            title: "[DEBUGGING] Backend Test",
            headerRight: () => <StatusBar style={isDark ? "light" : "dark"} />,
          }}
        />
      </Drawer>
    </SafeAreaProvider>
  );
}
