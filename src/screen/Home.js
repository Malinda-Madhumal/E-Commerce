import { View, Text, Animated } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../redux/cartSlice";
import { cartTotalSelector } from "../redux/selector";
import AnimatedHeader from "../components/home/AnimatedHeader";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import HorizontalImage from "../components/home/HorizontalImage";
import Loading from "../components/home/Loading";
import ProductList from "../components/home/ProductList";

const HEADER_HEIGHT = 85;

const Home = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [oldData, setOldData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const searchRef = React.useRef();
  const [loading, setLoading] = React.useState(true);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const getProductFromApi = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setData(json);
      setOldData(json);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProductFromApi();
  }, []);

  const onSearch = (text) => {
    if (text === "") {
      setData(oldData);
    } else {
      let tempList = data.filter((item) => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
    }
  };

  const total = useSelector(cartTotalSelector);

  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    KanitBold: require("../fonts/Kanit-Bold.ttf"),
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
      <AnimatedHeader
        Height={HEADER_HEIGHT}
        headerY={headerY}
        navigation={navigation}
        total={total}
        search={search}
        setSearch={setSearch}
        searchRef={searchRef.current?.clear()}
        onSearch={onSearch}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View
          style={{
            marginTop: HEADER_HEIGHT + 10,
          }}
        />
        <View
          style={{
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          <Text
            onLayout={onLayoutRootView}
            style={{
              fontSize: 20,
              fontFamily: "KanitBold",
            }}
          >
            Catogeries
          </Text>
        </View>
        <HorizontalImage />

        {/* Render Data from API */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            onLayout={onLayoutRootView}
            style={{
              fontSize: 20,
              fontFamily: "KanitBold",
              marginLeft: 10,
              marginBottom: 20,
            }}
          >
            Product
          </Text>
          {loading ? (
            <Loading />
          ) : (
            <ProductList
              data={data}
              navigation={navigation}
              dispatch={dispatch}
              addtoCart={addtoCart}
            />
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
