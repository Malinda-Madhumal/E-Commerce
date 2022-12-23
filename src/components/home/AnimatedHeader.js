import { View, Text, Animated, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function AnimatedHeader({ navigation, Height, headerY, total }) {
  return (
    <Animated.View
      style={{
        backgroundColor: "#21a0a0",
        height: Height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        transform: [
          {
            translateY: headerY,
          },
        ],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
          marginRight: 20,
          marginTop: 45,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome5 name="user" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="ios-cart" size={24} color="#fff" />
          <View
            style={{
              position: "absolute",
              backgroundColor: total ? "red" : "transparent",
              right: -10,
              top: -10,
              width: 20,
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              {total ? total : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
