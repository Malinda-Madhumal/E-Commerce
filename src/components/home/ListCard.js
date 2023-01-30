import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function ListCard({ item, navigation, addtoCart, dispatch }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          title: item.title,
          rate: item.rating.rate,
          image: item.image,
          description: item.description,
          price: item.price,
          category: item.category,
          count: item.rating.count,
        })
      }
      activeOpacity={1}
      style={{
        backgroundColor: "white",
        marginVertical: 5,
        elevation: 10,
        width: 150,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("Stories", {
            image: item.image,
            title: item.title,
          })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: 150,
            height: 96,
            resizeMode: "cover",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            marginTop: 15,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {item.title}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: "#747171",
            marginTop: 5,
          }}
        >
          {item.description}
        </Text>
        <Text
          style={{
            fontSize: 17,
            marginTop: 5,
            fontWeight: "bold",
          }}
        >
          Price {"\t"}
          <Text
            style={{
              color: "#21A0A0",
            }}
          >
            ${item.price}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: item.rating.rate >= 4 ? "#11D100" : "#FF0101",
              fontWeight: "bold",
            }}
          >
            {item.rating.rate}
          </Text>
          <AntDesign
            name="star"
            size={20}
            color={"gold"}
            style={{
              marginLeft: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => dispatch(addtoCart(item))}
            style={{
              marginLeft: 20,
            }}
          >
            <Ionicons name="ios-cart" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
