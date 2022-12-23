import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function AuthButton({ title, onPress }) {
  const [fontsLoaded] = useFonts({
    KanitBold: require("../../fonts/Kanit-Bold.ttf"),
  });

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
    <TouchableOpacity
      onPress={() => onPress()}
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
        {title}
      </Text>
    </TouchableOpacity>
  );
}
