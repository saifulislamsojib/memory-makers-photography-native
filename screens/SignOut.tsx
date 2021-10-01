import React, { useContext } from "react";
import { Text } from "react-native";
import { userSignOut } from "../auth/authManager";
import Button from "../components/Button";
import Container from "../components/Container";
import context from "../context/context";
import { userLogout } from "../reducers/userActions";
import NavigationProps from "../types/NavigationProps";

const SignOut = ({ navigation }: NavigationProps<"SignOut">) => {
  const { userDispatch } = useContext(context);

  const handleSignOut = async () => {
    await userSignOut();
    userDispatch(userLogout());
    navigation.navigate("SignUp");
  };

  return (
    <Container>
      <Text>Sign Out</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </Container>
  );
};

export default SignOut;
