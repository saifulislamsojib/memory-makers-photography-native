import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import { signInUser } from "../auth/authManager";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import useForm from "../hooks/useForm";
import useRootContext from "../hooks/useRootContext";
import { userFailure, userLoading, userSuccess } from "../reducers/userActions";
import signUpStyles from "../styles/signUpStyles";
import NavigationProps from "../types/NavigationProps";

interface ILoginData {
  email: string;
  password: string;
}

const SignIn = ({ navigation }: NavigationProps<"SignIn">) => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleInput, handleSubmit, error, inputData } = useForm<ILoginData>([
    "email",
    "password",
  ]);

  const { loggedInUser, userDispatch } = useRootContext();

  const { loading, privateLoading, user } = loggedInUser;

  const toggle = () => setShowPassword((preValue) => !preValue);

  const submit = async (data: ILoginData) => {
    userDispatch(userLoading());
    const { email, password } = data;
    try {
      const user = await signInUser(email, password);
      userDispatch(userSuccess(user));
      navigation.navigate("Home");
    } catch (err: any) {
      const message = err.message?.split("/")?.[1].split?.(")")?.[0];
      userDispatch(userFailure(message));
      Alert.alert("Sign In Error", message);
    }
  };

  useEffect(() => {
    if (!privateLoading && user.email) {
      navigation.navigate("Home");
    }
  }, [privateLoading, user]);

  return (
    <Container>
      {loading && (
        <ActivityIndicator
          style={signUpStyles.loading}
          size={30}
          color="#1770ff"
        />
      )}
      {privateLoading && (
        <ActivityIndicator
          style={signUpStyles.loading}
          size={30}
          color="#1770ff"
        />
      )}

      {!privateLoading && (
        <>
          <Text style={signUpStyles.heading}>Sign In</Text>
          <Input
            label="Email"
            placeholder="Enter your email"
            onChangeText={(value) => handleInput(value, "email")}
            value={inputData.email || ""}
            autoComplete="email"
          />
          {error.email && (
            <Text style={signUpStyles.error}>Valid Email Is Required</Text>
          )}
          <Input
            label="Password"
            placeholder="Password"
            secureTextEntry={!showPassword}
            toggleFunc={toggle}
            onChangeText={(value) => handleInput(value, "password")}
            value={inputData.password || ""}
            autoComplete="password"
          />
          {error.password && (
            <Text style={signUpStyles.error}>
              Password Is Required Minimum 6 Characters
            </Text>
          )}
          <Button
            title="Sign In"
            style={signUpStyles.button}
            onPress={() => handleSubmit(submit)}
            disabled={loading}
          />
          <Text style={signUpStyles.footer}>
            Don't have an account?{" "}
            <Text
              style={signUpStyles.highlight}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign In
            </Text>
          </Text>
        </>
      )}
    </Container>
  );
};

export default SignIn;
