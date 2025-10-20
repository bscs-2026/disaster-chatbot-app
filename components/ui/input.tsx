import { forwardRef, useState } from "react";
import { type TextInputProps, TextInput as RNTextInput, useColorScheme } from "react-native";
import { cn } from "../../lib/utils";

type InputProps = TextInputProps & {
  className?: string;
  maxRows?: number;
  value: string;
  onChangeText: (text: string) => void;
};

const Input = forwardRef<RNTextInput, InputProps>(
  ({ className, maxRows = 5, editable = true, style, value, onChangeText, ...props }, ref) => {
    const lineHeight = 20;
    const minHeight = 40;
    const maxHeight = maxRows * lineHeight;
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const [height, setHeight] = useState(minHeight);

    const bgColor = isDark ? "bg-neutral-900" : "bg-white";
    const textColor = isDark ? "text-white" : "text-black";
    const placeholderColor = isDark ? "#A1A1AA" : "#9CA3AF";

    return (
      <RNTextInput
        ref={ref}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        multiline
        onContentSizeChange={(e) =>
          setHeight(Math.min(e.nativeEvent.contentSize.height, maxHeight))
        }
        style={[
          {
            minHeight,
            maxHeight,
            height,
            textAlignVertical: "center",
            paddingVertical: 8,
            paddingHorizontal: 16,
          },
          style,
        ]}
        className={cn(
          "rounded-full text-base",
          bgColor,
          textColor,
          !editable && "bg-gray-200 text-gray-500 opacity-70",
          className
        )}
        placeholderTextColor={placeholderColor}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
