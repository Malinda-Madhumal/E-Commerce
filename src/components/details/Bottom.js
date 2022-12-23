import { View, Text, Animated, Dimensions } from "react-native";
import React from "react";

const height = Dimensions.get("screen").height;

export default function Bottom({ bottomY }) {
  return (
    <Animated.View
      style={{
        height: 52,
        backgroundColor: "#21A0A0",
        position: "absolute",
        top: height - 70,
        right: 0,
        left: 30,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        transform: [
          {
            translateY: bottomY,
          },
        ],
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
        }}
      >
        Buy Now
      </Text>
    </Animated.View>
  );
}
