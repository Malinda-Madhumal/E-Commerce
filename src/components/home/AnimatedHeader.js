import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";

export default function AnimatedHeader({
  navigation,
  Height,
  headerY,
  total,
  search,
  setSearch,
  searchRef,
  onSearch,
}) {
  const [visible, setVisible] = React.useState(false);

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
          // justifyContent: "space-between",
        }}
      >
        {/* Profile Icon */}
        <TouchableOpacity
          style={{
            opacity: visible ? 0 : 1,
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <FontAwesome5 name="user" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Search Icon */}
        {visible ? (
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#eee",
              width: "100%",
              marginLeft: -20,
              height: 40,
              borderRadius: 10,
              zIndex: 1,
            }}
          >
            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={(text) => {
                onSearch(text);
                setSearch(text);
              }}
              style={{
                width: "90%",
                paddingLeft: 10,
                height: 40,
                fontSize: 15,
              }}
            />
            <TouchableOpacity
              ref={searchRef}
              onPress={() => {
                searchRef;
                setSearch("");
                onSearch("");
                setVisible(false);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View
            style={{
              marginLeft: "auto",
              marginRight: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisible(!visible);
              }}
            >
              <AntDesign name="search1" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Cart Icon */}
        <TouchableOpacity
          style={{
            position: "absolute",
            right: -10,
            opacity: visible ? 0 : 1,
            zIndex: visible ? 0 : 1,
          }}
          onPress={() => navigation.navigate("Cart")}
        >
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
