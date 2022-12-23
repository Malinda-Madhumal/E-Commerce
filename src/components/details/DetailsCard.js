import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AnimatedLottieView from "lottie-react-native";

export default function DetailsCard({
  title,
  rate,
  price,
  category,
  description,
  count,
  maxRating,
  defaultRating,
  setDefaultRating,
  onLayotRootView,
}) {
  const [isLiked, setIsLiked] = React.useState(false);
  let animation = React.useRef(null);
  let isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRun.current) {
      if (isLiked) {
        animation.current?.play(66, 66);
      } else {
        animation.current?.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (isLiked) {
      animation.current?.play(19, 66);
    } else {
      animation.current?.play(0, 19);
    }
  }, [isLiked]);

  const Rating = () => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {maxRating.map((item, index) => {
          return (
            <TouchableOpacity key={item} onPress={() => setDefaultRating(item)}>
              <AntDesign
                name={item <= defaultRating ? "star" : "staro"}
                size={24}
                color={item <= defaultRating ? "gold" : "grey"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: 370,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        elevation: 10,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          marginTop: 20,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            onLayout={onLayotRootView}
            style={{
              fontSize: 20,
              fontFamily: "Kanit",
              maxWidth: '85%'
            }}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => setIsLiked(!isLiked)}
            style={{
              marginLeft: 'auto'
            }}
          >
            <AnimatedLottieView
              source={require("../../assets/44921-like-animation.json")}
              style={{
                width: 60,
                height: 60,
              }}
              autoPlay={false}
              loop={false}
              ref={animation}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 10,
            marginRight: 10,
            color: "#898989",
            fontSize: 14.5,
          }}
        >
          {description}
        </Text>
        <View
          style={{
            backgroundColor: "#DDDDDD",
            height: 2,
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            marginRight: 20,
          }}
        >
          <Text
            onLayout={onLayotRootView}
            style={{
              fontFamily: "Kanit",
              fontSize: 18,
            }}
          >
            Price
          </Text>
          <Text
            style={{
              color: "#21A0A0",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            ${price}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#DDDDDD",
            height: 2,
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            marginRight: 20,
          }}
        >
          <Text
            onLayout={onLayotRootView}
            style={{
              fontFamily: "Kanit",
              fontSize: 18,
            }}
          >
            Rate
          </Text>
          <Text
            style={{
              color: rate >= 4 ? "#11D100" : "#FF0101",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {rate}
          </Text>
          <Rating />
        </View>
        <View
          style={{
            backgroundColor: "#DDDDDD",
            height: 2,
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            marginRight: 20,
          }}
        >
          <Text
            onLayout={onLayotRootView}
            style={{
              fontFamily: "Kanit",
              fontSize: 18,
            }}
          >
            Category
          </Text>
          <Text
            style={{
              color: "#21A0A0",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {category}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#DDDDDD",
            height: 2,
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            marginRight: 20,
            marginBottom: 10,
          }}
        >
          <Text
            onLayout={onLayotRootView}
            style={{
              fontFamily: "Kanit",
              fontSize: 18,
            }}
          >
            Count
          </Text>
          <Text
            style={{
              color: "#21A0A0",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {count}
          </Text>
        </View>
      </View>
    </View>
  );
}
