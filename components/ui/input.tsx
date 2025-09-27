import React, { forwardRef } from "react";
import { type TextInputProps, type TextInput as RNTextInput } from "react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { cn } from "../lib/utils";

type InputProps = TextInputProps & {
  className?: string;
  maxRows?: number;
  value: string;
  onChangeText: (text: string) => void;
};

const Input = forwardRef<RNTextInput, InputProps>(
  ({ className, maxRows = 5, editable = true, style, value, onChangeText, ...props }, ref) => {
    const lineHeight = 20; // roughly matches text-base font
    const minHeight = 40;
    const maxHeight = maxRows * lineHeight;

    return (
      <AutoGrowingTextInput
        ref={ref}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        multiline
        style={[
          {
            minHeight,
            maxHeight,
            textAlignVertical: "top",
            paddingVertical: 8,
            paddingHorizontal: 16,
          },
          style,
        ]}
        className={cn(
          "rounded-full text-base",
          "bg-white text-black dark:bg-gray-800 dark:text-white",
          !editable && "bg-gray-200 text-gray-500 opacity-70",
          className
        )}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
