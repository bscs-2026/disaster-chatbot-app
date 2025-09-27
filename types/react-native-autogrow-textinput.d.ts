declare module "react-native-autogrow-textinput" {
  import { Component } from "react";
  import { TextInput, TextInputProps, StyleProp, TextStyle } from "react-native";

  export interface AutoGrowingTextInputProps extends TextInputProps {
    style?: StyleProp<TextStyle>;
  }

  export class AutoGrowingTextInput extends Component<AutoGrowingTextInputProps> {}
}
