import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Sizes({ item, index, activeTab, setActiveTab }) {
  return (
    <TouchableOpacity
      onPress={() => setActiveTab(index)}
      style={{
        marginHorizontal: 5,
        backgroundColor: activeTab === index ? "#21A0A0" : "white",
        elevation: 10,
        borderRadius: 5,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        transform: [
          {
            scale: activeTab === index ? 1 : 0.9,
          },
        ],
      }}
      key={index}
    >
      <Text
        style={{
          color: activeTab === index ? "white" : "#21A0A0",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {item.item}
      </Text>
    </TouchableOpacity>
  );
}
