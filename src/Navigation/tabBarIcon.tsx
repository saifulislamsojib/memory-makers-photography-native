import { ParamListBase, RouteProp } from "@react-navigation/native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface TabBarIcon {
  focused: boolean;
  color: string;
}

const tabBarIcon = ({ name }: RouteProp<ParamListBase, string>) => {
  return ({ focused, color }: TabBarIcon) => {
    if (name === "Home") {
      return <FontAwesome name="home" size={26} color={color} />;
    } else if (name === "Dashboard") {
      return <MaterialIcons name="dashboard" size={26} color={color} />;
    } else if (name === "SignUp") {
      return (
        <MaterialCommunityIcons
          name={focused ? "account-plus" : "account-plus-outline"}
          size={26}
          color={color}
        />
      );
    } else if (name === "SignIn" || name === "SignOut") {
      return <FontAwesome name="sign-in" size={26} color={color} />;
    }
  };
};

export default tabBarIcon;
