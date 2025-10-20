import { Pressable, ActivityIndicator, useColorScheme } from "react-native";
import { cn } from "../../lib/utils";
import { Icon } from "../ui/icon";

type SubmitBtnProps = {
  variant?: "default" | "disabled" | "loading";
  onPress?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function SubmitBtn({
  variant = "default",
  onPress,
  className,
  size = "md",
}: SubmitBtnProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // ---- Size variants (circle) ----
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-14 w-14",
  }[size];

  // ---- Colors ----
  const variantClasses = {
    default: isDark ? "bg-[#40414F] active:bg-[#FFF]" : "bg-blue-500 active:bg-blue-600",
    disabled: isDark ? "bg-[#2A2B32] opacity-40" : "bg-blue-300 opacity-70",
    loading: isDark ? "bg-[#40414F]" : "bg-blue-500",
  }[variant];

  const iconColor =
    variant === "disabled" ? (isDark ? "#8E8E93" : "white") : isDark ? "white" : "white";

  // ---- Icon logic ----
  const renderIcon = () => {
    if (variant === "loading") {
      return <ActivityIndicator size="small" color={iconColor} />;
    }
    return <Icon name="ArrowUp" size={20} stroke={iconColor} />;
  };
  return (
    <Pressable
      onPress={variant === "disabled" ? undefined : onPress}
      disabled={variant === "disabled" || variant === "loading"}
      className={cn(
        "items-center justify-center rounded-full",
        sizeClasses,
        variantClasses,
        className
      )}
    >
      {renderIcon()}
    </Pressable>
  );
}
