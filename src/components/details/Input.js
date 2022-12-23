import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
} from "react-native-gesture-handler";

const SIZE = 25;

const width = Dimensions.get("screen").width - 34;

const MAXWIDTH = width - SIZE / 2 + 6;

export default function Input() {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.StartX = translateX.value;
    },
    onActive: (event, ctx) => {
      scale.value = 1.7;
      translateX.value =
        ctx.StartX + event.translationX < 0
          ? 0
          : ctx.StartX + event.translationX > MAXWIDTH
          ? MAXWIDTH
          : ctx.StartX + event.translationX;
    },
    onEnd: () => {
      scale.value = 1;
    },
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      height: 10,
      borderRadius: 10,
      width: translateX.value,
      //   marginTop: -10,
    };
  });

  const KnobStyle = useAnimatedStyle(() => {
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

  const AnimatedKnob = gestureHandlerRootHOC(() => (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.knob, KnobStyle]} />
    </PanGestureHandler>
  ));

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          // marginTop: "60%",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#bbb",
            width: "100%",
            height: 10,
            borderRadius: 10,
          }}
        >
          <Animated.View
            style={[animationStyle, { backgroundColor: "orange" }]}
          />
        </View>
      </View>
      <AnimatedKnob />
    </View>
  );
}

const styles = StyleSheet.create({
  knob: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "#8080ff",
    marginLeft: 10,
    marginTop: -17,
    borderRadius: SIZE,
    position: "absolute",
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
