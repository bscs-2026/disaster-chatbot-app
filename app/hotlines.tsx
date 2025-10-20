import {
  ScrollView,
  View,
  Text,
  Pressable,
  Linking,
  Alert,
  Image,
  useColorScheme,
} from "react-native";
import * as Clipboard from "expo-clipboard";

export default function Hotlines() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleAction = (num: string) => {
    const clean = num.replace(/[^0-9]/g, "");
    if (num.toLowerCase().includes("text hotline")) {
      Linking.openURL(`sms:${clean}`);
    } else {
      Linking.openURL(`tel:${clean}`);
    }
  };

  const handleCopy = (num: string) => {
    Clipboard.setStringAsync(num);
    Alert.alert("📋 Copied", `${num} copied to clipboard`);
  };

  const Card = ({ title, icon, numbers }: { title: string; icon?: string; numbers: string[] }) => (
    <View
      className={`mb-5 rounded-xl border p-4 shadow-md ${
        isDark ? "border-[#2A2B32] bg-[#2A2B32]" : "border-gray-200 bg-white"
      }`}
    >
      <View className="mb-3 flex-row items-center">
        {icon ? (
          icon.includes(".png") || icon.includes(".jpg") ? (
            <Image
              source={require("../assets/logos/dswd.png")} // example only
              className="mr-2 h-6 w-6"
              resizeMode="contain"
            />
          ) : (
            <Text className="mr-2 text-lg">{icon}</Text>
          )
        ) : null}
        <Text className={`flex-shrink text-lg font-bold ${isDark ? "text-white" : "text-black"}`}>
          {title}
        </Text>
      </View>

      {numbers.map((num, i) => (
        <Pressable
          key={i}
          onPress={() => handleAction(num)}
          onLongPress={() => handleCopy(num)}
          className={`mb-2 rounded-lg px-4 py-3 ${
            isDark ? "bg-[#40414F] active:bg-blue-900" : "bg-blue-500 active:bg-blue-600"
          }`}
        >
          <Text
            className={`text-center text-base font-semibold ${
              isDark ? "text-white" : "text-white"
            }`}
          >
            {num}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <ScrollView className={`flex-1 p-4 ${isDark ? "bg-[#202123]" : "bg-gray-50"}`}>
      <Text
        className={`mb-6 text-center text-2xl font-extrabold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Disaster Hotlines
      </Text>

      <Card title="National Emergency Hotline" icon="🚨" numbers={["911"]} />

      <Card
        title="National Disaster Risk Reduction and Management Council (NDRRMC)"
        icon="../assets/logos/ndrrmc.png"
        numbers={[
          "(02) 8911-5061 to 65 local 100",
          "(02) 8911-1406",
          "(02) 8912-2665",
          "(02) 8912-5668",
          "(02) 8911-1873",
        ]}
      />

      <Card
        title="Department of Social Welfare and Development (DSWD)"
        icon="../assets/logos/dswd.png"
        numbers={[
          "0918-912-2813 (Text Hotline)",
          "(02) 8931-8101 to 07",
          "(02) 8856-3665 (Disaster Response Unit)",
          "(02) 8852-8081 (Disaster Response Unit)",
        ]}
      />

      <Card
        title="Philippine Red Cross"
        icon="../assets/logos/redcross.png"
        numbers={[
          "143 (Hotline)",
          "(02) 8527-8385 to 95 (National Blood Center)",
          "(02) 8527-0000",
          "(02) 8790-2300",
        ]}
      />

      <Card
        title="Bureau of Fire Protection (BFP)"
        icon="../assets/logos/bfp.png"
        numbers={["(02) 8426-0219", "(02) 8426-0246"]}
      />

      <Card
        title="Philippine Coast Guard"
        icon="../assets/logos/pcg.png"
        numbers={[
          "(02) 8527-8481 to 89",
          "(02) 8527-3877",
          "(02) 8527-3880 to 85",
          "0917-724-3682 (Text Hotline)",
          "0918-967-4697 (Text Hotline)",
        ]}
      />

      <Card
        title="PAGASA (Weather)"
        icon="../assets/logos/pagasa.png"
        numbers={["(02) 8284-0800"]}
      />

      <Card
        title="PHIVOLCS (Volcano & Earthquake)"
        icon="../assets/logos/phivolcs.png"
        numbers={["(02) 8426-1468 to 79"]}
      />

      <Card
        title="Philippine National Police (PNP)"
        icon="../assets/logos/pnp.png"
        numbers={["117 (Emergency Hotline)", "(02) 8722-0650", "0917-847-5757 (Text Hotline)"]}
      />
    </ScrollView>
  );
}
