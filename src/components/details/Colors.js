import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Colors({
  item,
  index,
  colorActiveTab,
  setColorActiveTab,
  //   index
}) {
  return (
    <TouchableOpacity
      onPress={() => setColorActiveTab(index)}
      style={{
        marginHorizontal: 5,
        backgroundColor: item,
        elevation: 10,
        borderRadius: 5,
        width: 40,
        height: 40,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        alignItems: "center",
        marginTop: 10,
        transform: [
          {
            scale: colorActiveTab === index ? 1.1 : 0.9,
          },
        ],
      }}
      key={index}
    >
      <Text
        style={{
          color: colorActiveTab === index ? "white" : "#21A0A0",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {item.item}
      </Text>
    </TouchableOpacity>
  );
}
