import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import context from "../context/context";
import Dashboard from "../screens/Dashboard";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignOut from "../screens/SignOut";
import SignUp from "../screens/SignUp";

const { Navigator, Screen } = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { loggedInUser } = useContext(context);

  const { user } = loggedInUser;
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            if (route.name === "Home") {
              return <FontAwesome name="home" size={26} color={color} />;
            } else if (route.name === "Dashboard") {
              return <MaterialIcons name="dashboard" size={26} color={color} />;
            } else if (route.name === "SignUp") {
              return (
                <MaterialCommunityIcons
                  name={focused ? "account-plus" : "account-plus-outline"}
                  size={26}
                  color={color}
                />
              );
            } else if (route.name === "SignIn" || route.name === "SignOut") {
              return <FontAwesome name="sign-in" size={26} color={color} />;
            }
          },
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
