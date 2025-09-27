import { StyleProp, ViewStyle } from "react-native";
import React from "react";
import * as LucideIcons from "lucide-react-native";

type IconProps = {
  name: keyof typeof LucideIcons;
  size?: number;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
};

export function Icon({ name, size = 20, stroke = "black", style }: IconProps) {
  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    size?: number;
    stroke?: string;
    style?: StyleProp<ViewStyle>;
  }>;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" does not exist in lucide-react-native`);
    return null;
  }

  return <LucideIcon size={size} stroke={stroke} style={style} />;
}
