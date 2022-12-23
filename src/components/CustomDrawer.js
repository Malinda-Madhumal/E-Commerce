import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "../context/Colors";
import { auth } from "../../firebase";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";

export default function CustomDrawer({ navigation }) {
  const user = auth.currentUser;

  const [fontsLoaded] = useFonts({
    KanitRegular: require("../fonts/Kanit-Regular.ttf"),
    KanitLight: require("../fonts/Kanit-Light.ttf"),
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
          backgroundColor: Colors.darkcyan,
          height: 140,
        }}
      >
        <View
          style={{
            marginTop: 40,
            marginLeft: 10,
          }}
        >
          <Image
            source={require("../assets/businessman-character-avatar-isolated_24877-60111.webp")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
          <Text
            onLayout={onLayoutRootView}
            style={{
              fontSize: 20,
              fontFamily: "KanitRegular",
              color: "white",
              marginTop: 10,
            }}
          >
            {user.displayName}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 40,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <AntDesign name="user" size={24} color="black" />
        <Text
          onLayout={onLayoutRootView}
          style={{
            marginLeft: 20,
            fontSize: 18,
            fontFamily: "KanitLight",
          }}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
