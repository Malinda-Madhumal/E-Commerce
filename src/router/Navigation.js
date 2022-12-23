import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screen/Welcome";
import Login from "../screen/Login";
import Register from "../screen/Register";
import Home from "../screen/Home";
import Cart from "../screen/Cart";
import Details from "../screen/Details";
import Profile from "../screen/Profile";
import Stories from "../screen/Stories";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 300,
        animationTypeForReplace: "push",
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          animationDuration: 300,
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          animationDuration: 300,
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Stories" component={Stories} />
    </Stack.Navigator>
  );
};

export default Navigation;
