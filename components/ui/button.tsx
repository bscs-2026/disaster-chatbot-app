import { Pressable, ActivityIndicator } from "react-native";
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
  // ---- Size variants (circle) ----
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-14 w-14",
  }[size];

  // ---- Colors ----
  const variantClasses = {
    default: "bg-blue-500 active:bg-blue-600",
    disabled: "bg-blue-300 opacity-70",
    loading: "bg-blue-500",
  }[variant];

  // ---- Icon logic ----
  const renderIcon = () => {
    if (variant === "loading") {
      // show square stop button (ChatGPT-like)
      // return <Icon name="Square" size={20} stroke="white" />;
      // OR spinner (uncomment instead if preferred)
      return <ActivityIndicator size="small" color="white" />;
    }
    return <Icon name="ArrowUp" size={20} stroke="white" />;
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
