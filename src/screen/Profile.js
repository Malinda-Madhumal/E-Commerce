import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { auth } from "../../firebase";
import { Colors } from "../context/Colors";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const HEADER_MAX_HEIGHT = 110;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export default function Profile({ navigation }) {
  const user = auth.currentUser;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  //  Animation Section
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });
  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: "clamp",
  });
  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 5,
    ],
    extrapolate: "clamp",
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 56,
    ],
    outputRange: [-25, -25, -25, 15],
    extrapolate: "clamp",
  });
  const opacity = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 56,
    ],
    outputRange: [-25, -25, -25, 15],
    extrapolate: "clamp",
  });

  // ! Function Section
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [fontsLoaded] = useFonts({
    KanitRegular: require("../fonts/Kanit-Regular.ttf"),
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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          backgroundColor: Colors.darkcyan,
          height: headerHeight,
          zIndex: headerZindex,
          // alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            marginTop: 35,
            marginLeft: 10,
          }}
        >
          <AntDesign name="arrowleft" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Animated.View
          style={{
            position: "absolute",
            bottom: headerTitleBottom,
            opacity,
            marginLeft: 55,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "KanitRegular",
            }}
          >
            {user.displayName}
          </Text>
        </Animated.View>
      </Animated.View>

      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={{
            height: profileImageHeight,
            width: profileImageHeight,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderWidth: 2,
            borderColor: "white",
            overflow: "hidden",
            marginTop: profileImageMarginTop,
            marginLeft: 20,
          }}
        >
          <Image
            source={{
              uri: "https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg",
            }}
            style={{
              flex: 1,
              width: null,
              height: null,
            }}
          />
        </Animated.View>
        <View
          style={{
            marginLeft: 10,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontFamily: "KanitRegular",
            }}
          >
            {user.displayName}
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => signOutUser()}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Octicons name="sign-out" size={24} color="black" />
            <Text
              style={{
                marginLeft: 15,
                fontSize: 20,
                fontFamily: "KanitRegular",
              }}
            >
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
