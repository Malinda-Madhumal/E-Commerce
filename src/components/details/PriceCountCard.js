import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Sizes from "./Sizes";
import Colors from "./Colors";
import { AntDesign } from "@expo/vector-icons";

const sizes = [
  {
    item: "S",
  },
  {
    item: "M",
  },
  {
    item: "L",
  },
];

const colors = ["#000", "#747171", "#0703DB", "#FFD700", "#21A0A0"];

export default function PriceCountCard({ onLayoutRootView, price }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [colorActiveTab, setColorActiveTab] = React.useState(0);
  const [count, setCount] = React.useState(1);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const decreament = () => {
    setCount((count) => count - 1);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: 370,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        elevation: 10,
        marginBottom: 20,
        height: 350,
      }}
    >
      <View
        style={{
          marginTop: 25,
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Kanit",
          }}
          onLayout={onLayoutRootView}
        >
          Count
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginRight: "20%",
          }}
        >
          <TouchableOpacity
            onPress={decreament}
            disabled={count <= 0 ? true : false}
            style={{
              backgroundColor: "#21A0A0",
              justifyContent: "center",
              alignItems: "center",
              width: 35,
              height: 35,
              borderRadius: 35,
            }}
          >
            <AntDesign name="minus" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 10,
              marginRight: 10,
              fontSize: 20,
              fontWeight: 'bold'
            }}
          >
            {count}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#21A0A0",
              justifyContent: "center",
              alignItems: "center",
              width: 35,
              height: 35,
              borderRadius: 35,
            }}
            onPress={increment}
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: "auto",
              fontSize: 20,
              color: "#21A0A0",
              fontWeight: "bold",
            }}
          >
            {"$" +price * count}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Kanit",
            marginTop: 20
          }}
          onLayout={onLayoutRootView}
        >
          Sizes
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {sizes.map((item, index) => {
            return (
              <Sizes
                item={item}
                key={index}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                index={index}
              />
            );
          })}
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Kanit",
            marginTop: 20,
          }}
          onLayout={onLayoutRootView}
        >
          Colors
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {colors.map((item, index) => {
            return (
              <Colors
                item={item}
                key={index}
                colorActiveTab={colorActiveTab}
                setColorActiveTab={setColorActiveTab}
                index={index}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
