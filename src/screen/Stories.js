import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import React from "react";
import { Colors } from "../context/Colors";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

const width = Dimensions.get("screen").width;

export default function Stories({ route, navigation }) {
  const { title, image } = route.params;
  const animation = React.useRef(new Animated.Value(0)).current;

  const progressAnimation = animation.interpolate({
    inputRange: [0, 5],
    outputRange: ["0%", "100%"],
  });

  React.useEffect(() => {
    let timer = setTimeout(() => {
      // navigation.goBack();
    }, 5000);

    Animated.timing(animation, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.black,
      }}
    >
      <StatusBar style="light" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 40,
          marginLeft: 10,
        }}
      >
        <AntDesign name="arrowleft" size={29} color={Colors.white} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "grey",
          width: "95%",
          alignSelf: "center",
          height: 3,
          marginTop: 10,
          borderRadius: 3,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: Colors.white,
            height: "100%",
            borderRadius: 3,
            width: progressAnimation,
          }}
        />
      </View>
      <Image
        source={{ uri: image }}
        style={{
          width: width - 20,
          height: 500,
          resizeMode: "contain",
          marginTop: 70,
          alignSelf: "center",
        }}
      />
    </View>
  );
}
