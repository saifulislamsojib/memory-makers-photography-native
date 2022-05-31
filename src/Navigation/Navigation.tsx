import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import useRootContext from "../hooks/useRootContext";
import Dashboard from "../screens/Dashboard";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignOut from "../screens/SignOut";
import SignUp from "../screens/SignUp";
import tabBarIcon from "./tabBarIcon";

const { Navigator, Screen } = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { user } = useRootContext().loggedInUser;

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: tabBarIcon(route),
          tabBarColor: "#1770ff",
        })}
      >
        <Screen name="Home" component={Home} />
        <Screen name="Dashboard" component={Dashboard} />
        {!user.email && (
          <Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Sign In" }}
          />
        )}
        {!user.email && (
          <Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Sign Up" }}
          />
        )}
        {user.email && (
          <Screen
            name="SignOut"
            component={SignOut}
            options={{ title: "Sign Out" }}
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
