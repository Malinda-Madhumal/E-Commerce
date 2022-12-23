import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AuthButton from "../components/auth/AuthButton";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function Register({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validation, setValidation] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const signUp = async () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          const user = authUser.user;
          updateProfile(user, {
            displayName: name,
          });
          navigation.replace("Home");
        })
        .catch((error) => {
          setValidation(error.message);
        });
    }
  };

  const validationAndSet = (value, valueToCampare, setValue) => {
    if (value !== valueToCampare) {
      setValidation("Password do not match");
    } else {
      setValidation("");
    }
    setValue(value);
  };

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
            Sign Up
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
          Please Sign Up to your Account to Continue with App...
        </Text>
      </View>

      {/* Name */}
      <View
        style={{
          marginTop: "7%",
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            color: "#747171",
            fontWeight: "bold",
          }}
        >
          Name *
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
            placeholder="Enter Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
            }}
          />
        </View>
      </View>

      {/* Email */}
      <View
        style={{
          marginTop: "5%",
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
            keyboardType={"email-address"}
            autoCapitalize={"none"}
          />
        </View>
      </View>

      {/* Password */}
      <View
        style={{
          marginTop: "5%",
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
      </View>

      {/* Confirm Password */}
      <View
        style={{
          marginTop: "5%",
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            color: "#747171",
            fontWeight: "bold",
          }}
        >
          Confirm Password *
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
            borderWidth: validation ? 1 : 0,
            borderColor: validation ? "red" : null,
          }}
        >
          <Ionicons name="ios-lock-closed" size={24} color="#21a0a0" />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) =>
              validationAndSet(value, password, setConfirmPassword)
            }
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
      <AuthButton title={"Sign Up"} onPress={signUp} />
    </SafeAreaView>
  );
}
