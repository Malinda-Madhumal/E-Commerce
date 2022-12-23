import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { auth } from "../../firebase";

const { width } = Dimensions.get("screen").width;

export default function Welcome({ navigation }) {
  const [fontsLoaded] = useFonts({
    KanitBold: require("../fonts/Kanit-Bold.ttf"),
  });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    // ? clean the unsubscribe
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 23,
          marginRight: 10,
          marginLeft: 10,
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        Welcome to E-com
      </Text>
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/ecommerce-campaign-concept-illustration_114360-8432.jpg?w=2000",
        }}
        style={{
          width: width,
          height: 400,
          resizeMode: "center",
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          width: 330,
          height: 55,
          backgroundColor: "#21a0a0",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginTop: 60,
        }}
      >
        <Text
          onLayout={onLayoutRootView}
          style={{
            fontSize: 30,
            color: "white",
            fontFamily: "KanitBold",
          }}
        >
          Discover
        </Text>
      </TouchableOpacity>
      <View
        style={{
          alignSelf: "center",
          marginTop: "20%",
        }}
      >
        <Text
          style={{
            color: "#747171",
            fontSize: 15,
          }}
        >
          Find your best matches accessories in here
        </Text>
      </View>
    </SafeAreaView>
  );
}
