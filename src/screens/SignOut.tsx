import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { logout } from "../auth/authManager";
import Button from "../components/Button";
import Container from "../components/Container";
import context from "../context/context";
import { userLoading, userLogout } from "../reducers/userActions";
import NavigationProps from "../types/NavigationProps";

const SignOut = ({ navigation }: NavigationProps<"SignOut">) => {
  const { userDispatch, loggedInUser } = useContext(context);

  const { loading, privateLoading } = loggedInUser;

  const handleSignOut = async () => {
    userDispatch(userLoading());
    await logout();
    userDispatch(userLogout());
    navigation.navigate("SignUp");
  };

  return (
    <Container>
      {loading && (
        <ActivityIndicator style={styles.marginTop} size={30} color="#1770ff" />
      )}
      {privateLoading && (
        <ActivityIndicator style={styles.marginTop} size={30} color="#1770ff" />
      )}
      <Text style={styles.error}>Are you sure you want to sign out..??</Text>
      <Button
        title="Sign Out"
        onPress={handleSignOut}
        style={styles.marginTop}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 10,
  },
  error: {
    marginTop: 15,
    backgroundColor: "#ffd4d4",
    color: "#ff0000",
    fontSize: 16,
    padding: 5,
    textAlign: "center",
  },
});

export default SignOut;
