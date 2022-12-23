import {
  View,
  Text,
  Animated,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { items } from "../../data/data";
import { Colors } from "../../context/Colors";

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

const width = Dimensions.get("screen").width * 0.9 - 55;

export default function HorizontalImage() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  let flatListRef = React.useRef(null);

  const onViewRef = React.useRef(({ changed }) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index: index });
  };

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => (flatListRef.current = ref)}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef}
        snapToAlignment="center"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            // extrapolate: "clamp",
          });
          return (
            <Animated.View
              style={{
                width: width,
                alignItems: "center",
                paddingTop: 10,
                transform: [
                  {
                    scale,
                  },
                ],
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: 250,
                  height: 160,
                  borderRadius: 10,
                }}
              />
            </Animated.View>
          );
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {items.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToIndex(index)}
              style={{
                backgroundColor:
                  currentIndex == index
                    ? Colors.darkcyan
                    : "rgba(33, 160, 160, 0.3)",
                width:  currentIndex === index ? 20 : 10,
                height: 10,
                borderRadius: 12,
                marginHorizontal: 3,
                transform: [
                  {
                    scale: currentIndex == index ? 1 : 0.8,
                  },
                ],
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
