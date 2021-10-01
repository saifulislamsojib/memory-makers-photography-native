import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { createUser } from "../auth/authManager";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import context from "../context/context";
import useForm from "../hooks/useForm";
import { userLoading, userSuccess } from "../reducers/userActions";
import signUpStyles from "../styles/signUpStyles";
import NavigationProps from "../types/NavigationProps";

interface ILoginData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = ({ navigation }: NavigationProps<"SignUp">) => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleInput, handleSubmit, error, inputData } = useForm<ILoginData>([
    "name",
    "email",
    "password",
    "confirmPassword",
  ]);

  const { loggedInUser, userDispatch } = useContext(context);

  const { loading, privateLoading, user } = loggedInUser;

  const toggle = () => setShowPassword((preValue) => !preValue);

  const submit = async (data: ILoginData) => {
    userDispatch(userLoading());
    const { email, password, name } = data;
    const user = await createUser(email, password, name);
    userDispatch(userSuccess(user));
    navigation.navigate("Home");
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
          size="small"
          color="#0000ff"
        />
      )}

      {privateLoading && (
        <ActivityIndicator
          style={signUpStyles.loading}
          size="small"
          color="#0000ff"
        />
      )}

      {!privateLoading && (
        <ScrollView>
          <Text style={signUpStyles.heading}>Create An Account</Text>
          <Input
            label="Name"
            placeholder="Enter your name"
            onChangeText={(value) => handleInput(value, "name")}
            value={inputData.name || ""}
            autoCompleteType="name"
          />
          {error.name && (
            <Text style={signUpStyles.error}>
              Name Is Required Minimum 6 Characters
            </Text>
          )}
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
          <Input
            label="Confirm Password"
            placeholder="Confirm password"
            secureTextEntry={!showPassword}
            toggleFunc={toggle}
            onChangeText={(value) => handleInput(value, "confirmPassword")}
            value={inputData.confirmPassword || ""}
            autoCompleteType="password"
          />
          {error.confirmPassword && (
            <Text style={signUpStyles.error}>Confirm Password Not Matched</Text>
          )}
          <Button
            title="Sign Up"
            style={signUpStyles.button}
            onPress={() => handleSubmit(submit)}
            disabled={loading}
          />
          <Text style={signUpStyles.footer}>
            Already have an account?{" "}
            <Text
              style={signUpStyles.highlight}
              onPress={() => navigation.navigate("SignIn")}
            >
              Sign in
            </Text>
          </Text>
        </ScrollView>
      )}
    </Container>
  );
};

export default SignUp;
