import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../context/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import CartListItem from "../components/Cart/CartListItem";
import { clear } from "../redux/cartSlice";

export default function Cart({ navigation }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    KanitRegular: require("../fonts/Kanit-Regular.ttf"),
  });

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          height: 80,
          backgroundColor: Colors.darkcyan,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            marginLeft: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={Colors.white} />
          </TouchableOpacity>
          <Text
            onLayout={onLayoutRootView}
            style={{
              fontSize: 28,
              color: Colors.white,
              fontFamily: "KanitRegular",
              marginLeft: 20,
            }}
          >
            Cart
          </Text>
        </View>
      </View>
      {cart.length !== 0 ? (
        <>
          <View
            style={{
              marginTop: 20,
              marginLeft: 10,
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
              justifyContent: "space-between",
            }}
          >
            <Text
              onLayout={onLayoutRootView}
              style={{
                fontSize: 20,
                fontFamily: "KanitRegular",
              }}
            >
              Your recent Cart
            </Text>
            <TouchableOpacity onPress={() => dispatch(clear())}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={cart}
            renderItem={({ item, index }) => {
              return <CartListItem item={item} />;
            }}
          />
        </>
      ) : (
        <View
          style={{
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.red,
              fontWeight: "bold",
            }}
          >
            No recent Cart
          </Text>
        </View>
      )}
    </View>
  );
}
