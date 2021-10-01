import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface IProps extends TouchableOpacityProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({ title, textStyle, style, disabled, ...rest }: IProps) => {
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: disabled ? "lightgray" : "#1770ff" },
        styles.button,
        style,
      ]}
      {...rest}
      disabled={disabled}
    >
      <Text style={[textStyle, styles.btnText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    textAlign: "center",
    color: "white",
  },
});

export default Button;
