import { Pressable } from "react-native";
import { cn } from "../lib/utils";
import { Icon } from "../ui/icon";

type SubmitBtnProps = {
  variant?: "default" | "disabled" | "stop";
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

  // ---- Color styles ----
  const variantClasses = {
    default: "bg-black pressed:bg-gray-800 transition-colors duration-200",
    disabled: "bg-gray-300 opacity-70",
    stop: "bg-black pressed:bg-gray-800 transition-colors duration-200",
  }[variant];

  // ---- Icon styles ----
  const renderIcon = () => {
    if (variant === "stop") {
      return <Icon name="Square" size={20} stroke="white" />;
    }
    return <Icon name="ArrowUp" size={20} stroke="white" />;
  };

  return (
    <Pressable
      onPress={variant === "disabled" ? undefined : onPress}
      disabled={variant === "disabled"}
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
