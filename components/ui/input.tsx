import React, { forwardRef, useState } from "react";
import { type TextInputProps, TextInput as RNTextInput } from "react-native";
import { cn } from "../lib/utils";

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

    const [height, setHeight] = useState(minHeight);

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
