import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import { signingUser } from "../auth/authManager";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import context from "../context/context";
import useForm from "../hooks/useForm";
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

  const { loggedInUser, userDispatch } = useContext(context);

  const { loading, privateLoading, user } = loggedInUser;

  const toggle = () => setShowPassword((preValue) => !preValue);

  const submit = async (data: ILoginData) => {
    userDispatch(userLoading());
    const { email, password } = data;
    try {
      const user = await signingUser(email, password);
      userDispatch(userSuccess(user));
      navigation.navigate("Home");
    } catch (err: any) {
      userDispatch(userFailure(err.message));
      Alert.alert("SignUp Error", err.message);
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
            autoCompleteType="email"
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
            autoCompleteType="password"
          />
          {error.password && (
            <Text style={signUpStyles.error}>
              Password Is Required Minimum 6 Characters
            </Text>
          )}
          <Button
            title="Sign Up"
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
