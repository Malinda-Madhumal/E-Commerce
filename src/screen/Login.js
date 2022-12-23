import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AuthButton from "../components/auth/AuthButton";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validation, setValidation] = React.useState("");

  const login = async () => {
    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          navigation.replace("Home");
        })
        .catch((error) => {
          setValidation(error);
        });
    } else {
      setValidation("Please enter required field *");
    }
  };

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <MaskedView
        style={{ height: 40, marginTop: "5%" }}
        maskElement={
          <Text
            style={{
              fontSize: 30,
              marginLeft: 20,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        }
      >
        <LinearGradient
          colors={["#0E33F9", "#00C1EC"]}
          start={{ x: 0.33, y: 0.8 }}
          end={{ x: 0.1, y: 0.33 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
      <View
        style={{
          marginTop: 15,
          marginLeft: 20,
          maxWidth: "60%",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#B0AAAA",
          }}
        >
          Please Sign In to your Account to Continue with App...
        </Text>
      </View>

      {/* Email */}
      <View
        style={{
          marginTop: "25%",
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            color: "#747171",
            fontWeight: "bold",
          }}
        >
          Email *
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#D9D9D9",
            borderRadius: 5,
            width: 321,
            height: 55,
            paddingLeft: 10,
          }}
        >
          <MaterialIcons name="email" size={24} color="#21a0a0" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
            }}
          />
        </View>
        <Text
          style={{
            color: "red",
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          {validation}
        </Text>
      </View>

      {/* Password */}
      <View
        style={{
          marginTop: "10%",
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            color: "#747171",
            fontWeight: "bold",
          }}
        >
          Password *
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#D9D9D9",
            borderRadius: 5,
            width: 321,
            height: 55,
            paddingLeft: 10,
          }}
        >
          <Ionicons name="ios-lock-closed" size={24} color="#21a0a0" />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
            }}
          />
        </View>
        <Text
          style={{
            color: "red",
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          {validation}
        </Text>
      </View>

      {/* Button */}
      <AuthButton title={"Login"} onPress={login} />

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text>If you haven’t any account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text
            onLayout={onLayoutRootView}
            style={{
              color: "#21A0A0",
              fontSize: 15,
              fontFamily: "KanitBold",
              marginLeft: 10,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
