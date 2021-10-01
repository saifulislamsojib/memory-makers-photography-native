import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import context from "../context/context";
import Dashboard from "../screens/Dashboard";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignOut from "../screens/SignOut";
import SignUp from "../screens/SignUp";

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { loggedInUser } = useContext(context);

  const { user } = loggedInUser;
  return (
    <NavigationContainer>
      <Tab.Navigator
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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        {!user.email && (
          <Tab.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Sign In" }}
          />
        )}
        {!user.email && (
          <Tab.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Sign Up" }}
          />
        )}
        {user.email && (
          <Tab.Screen
            name="SignOut"
            component={SignOut}
            options={{ title: "Sign Out" }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
