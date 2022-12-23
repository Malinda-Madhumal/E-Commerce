import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Share,
  Animated,
} from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import DetailsCard from "../components/details/DetailsCard";
import Bottom from "../components/details/Bottom";
import PriceCountCard from "../components/details/PriceCountCard";
import AnimatedLottieView from "lottie-react-native";

const { width } = Dimensions.get("screen");

const BOTTOM_HEIGHT = 70;

export default function Details({ route, navigation }) {
  const { title, rate, image, description, price, category, count } =
    route.params;

  const [defaultRating, setDefaultRating] = React.useState(rate);
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const diffClampBotton = Animated.diffClamp(scrollY, 0, BOTTOM_HEIGHT);

  const opacity = scrollY.interpolate({
    inputRange: [0, 600],
    outputRange: [1, -1],
  });

  const bottomY = diffClampBotton.interpolate({
    inputRange: [0, BOTTOM_HEIGHT],
    outputRange: [0, BOTTOM_HEIGHT],
  });

  const [fontsLoaded] = useFonts({
    Kanit: require("../fonts/Kanit-Light.ttf"),
  });

  const onLayotRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  });

  if (!fontsLoaded) return null;

  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: title,
        },
        {
          dialogTitle: title,
        }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          zIndex: 1,
          top: 40,
          left: 10,
          right: 20,
          opacity,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign name="arrowleft" size={24} color="#21A0A0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onShare}
          style={{
            marginLeft: "auto",
            marginRight: -10,
            // zIndex: 1
          }}
        >
          <Ionicons name="ios-share-outline" size={24} color="#21A0A0" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          opacity,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: width,
            height: 300,
            resizeMode: "contain",
          }}
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginTop: "90%",
          }}
        />

        <View
          style={{
            backgroundColor: "#eee",
            marginTop: 20,
            borderRadius: 10,
            elevation: 10,
            // marginBottom: 10,
          }}
        >
          <DetailsCard
            title={title}
            rate={rate}
            price={price}
            category={category}
            description={description}
            count={count}
            maxRating={maxRating}
            defaultRating={defaultRating}
            setDefaultRating={setDefaultRating}
            onLayotRootView={onLayotRootView}
          />
          <PriceCountCard price={price} onLayotRootView={onLayotRootView} />
        </View>
      </Animated.ScrollView>
      <Bottom bottomY={bottomY} />
    </View>
  );
}
