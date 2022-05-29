import React, { ForwardedRef, forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface IProps extends TextInputProps {
  label?: string;
  toggleFunc?: () => void;
}

const Input = (
  { label, style, secureTextEntry, toggleFunc, ...rest }: IProps,
  ref: ForwardedRef<TextInput>
) => {
  const [focus, setFocus] = useState(false);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          {...rest}
          style={[
            styles.input,
            style,
            { borderColor: focus ? "#0084ff" : "#dfdfdf" },
            {
              paddingRight:
                secureTextEntry !== undefined && toggleFunc ? 30 : 5,
            },
          ]}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          secureTextEntry={secureTextEntry}
          ref={ref}
        />
        {secureTextEntry !== undefined && toggleFunc && (
          <Icon
            onPress={toggleFunc}
            name="eye"
            size={24}
            color={secureTextEntry ? "black" : "#006eff"}
            style={styles.icon}
          />
        )}
      </View>
    </>
  );
};

export default forwardRef(Input);

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 17,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 8,
    padding: 5,
    fontSize: 18,
    backgroundColor: "#e6e6e6",
  },
  icon: {
    position: "absolute",
    right: 5,
    top: "16%",
  },
});
