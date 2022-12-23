import { View, Animated, Dimensions, Easing, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const START = -1;
const END = 1;
const COLORS = ["#eee", "#ddd", "#eee"];
const DURATION = 1000;
const ANIMATION = new Animated.Value(START);
const LOCATIONS = [0.3, 0.5, 0.7];
const WIDTH = Dimensions.get("screen").width;

const runAnimation = () => {
  ANIMATION.setValue(START);
  Animated.timing(ANIMATION, {
    toValue: END,
    duration: DURATION,
    useNativeDriver: true,
    easing: Easing.linear(),
  }).start(runAnimation);
};

runAnimation();

const linear = ANIMATION.interpolate({
  inputRange: [START, END],
  outputRange: [-WIDTH, WIDTH],
});

const Skeleton = ({ width, height }) => {
  const [positionX, setPositionX] = React.useState(null);
  let viewRef = null;

  return (
    <View
      style={[styles.shrimmer, { width, height }]}
      ref={(ref) => (viewRef = ref)}
      onLayout={() => {
        if (viewRef) {
          viewRef.measure((_x, _y, _width, _height, pageX, _pageY) => {
            setPositionX(pageX);
          });
        }
      }}
    >
      {positionX !== null && (
        <Animated.View
          style={{
            flex: 1,
            left: -positionX,
            transform: [
              {
                translateX: linear,
              },
            ],
          }}
        >
          <LinearGradient
            locations={LOCATIONS}
            colors={COLORS}
            style={{ flex: 1, width: WIDTH }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  shrimmer: {
    overflow: "hidden",
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 5,
  },
});
