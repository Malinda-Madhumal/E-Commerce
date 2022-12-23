import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "../../context/Colors";
import { AntDesign } from "@expo/vector-icons";

export default function CartCard({ item }) {
  const [count, setCount] = React.useState(1);
  const increment = () => {
    setCount((count) => count + 1);
  };

  const decrement = () => {
    setCount((count) => count - 1);
  };
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        elevation: 10,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 15,
        borderRadius: 5,
        height: 160,
        marginBottom: 20
      }}
    >
      <View
        style={{
          flexDirection: "row",
          // alignItems: "center",
          marginTop: 15,
          marginLeft: 10,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
          }}
        />
        <View
          style={{
            marginTop: 10,
            marginLeft: 15,
          }}
        >
          <Text
            style={{
              maxWidth: "85%",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 15,
              color: Colors.darkcyan,
              fontWeight: "bold",
            }}
          >
            Price ${item.price * count}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              disabled={count <= 0 ? true : false}
              onPress={() => decrement()}
            >
              <AntDesign name="minus" size={24} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 19,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              {count}
            </Text>
            <TouchableOpacity onPress={() => increment()}>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
