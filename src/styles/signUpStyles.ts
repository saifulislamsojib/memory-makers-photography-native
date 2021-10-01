import { StyleSheet } from "react-native";

const signUpStyles = StyleSheet.create({
  heading: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
  },
  footer: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 10,
  },
  highlight: {
    color: "#1770ff",
  },
  error: {
    backgroundColor: "#ffd4d4",
    color: "#ff0000",
    fontSize: 16,
    padding: 5,
  },
  loading: {
    marginTop: 10,
  },
});

export default signUpStyles;
