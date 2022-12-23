import { Dimensions, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CartCard from "./CartCard";
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../context/Colors";

const { width } = Dimensions.get("screen");

const WIDTH = -width * 0.3;

export default function CartListItem({ item }) {
  const translateX = useSharedValue(0);
  const marginTop = useSharedValue(10);
  const scale = useSharedValue(1);
  const itemHeight = useSharedValue(160);
  const opacity = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      // scale.value = 1.1;
      translateX.value = event.translationX;
    },
    onEnd: () => {
      // scale.value = 1
      const dismissed = translateX.value < WIDTH;
      if (dismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        opacity.value = withTiming(0);
        scale.value = withTiming(0);
        marginTop.value = withTiming(0);
      }
    },
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginTop.value,
      opacity: opacity.value,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < WIDTH ? 1 : 0);
    return {
      opacity,
    };
  });

  const AnimatedSwipeDelete = gestureHandlerRootHOC(() => (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            width: "100%",
          },
          animationStyle,
        ]}
      >
        <CartCard item={item} />
      </Animated.View>
    </PanGestureHandler>
  ));

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          // marginVertical: 15,
        },
        containerStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            right: "3%",
            width: 90,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          },
          iconStyle,
        ]}
      >
        <Ionicons name="ios-trash-sharp" size={24} color="black" />
      </Animated.View>
      <AnimatedSwipeDelete />
    </Animated.View>
  );
}
