import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

export default function Index() {
  let [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to Amora 💕</Text>
        <Text style={styles.subtitle}>I hope your love lasts</Text>
      </View>

      <View style={styles.container}>
        <Svg height="300" width="400" viewBox="1 0 32 29.6" style={styles.heart}>
          <Path
            d="M23.6,0c-2.6,0-5,1.2-6.6,3.2C15.4,1.2,13,0,10.4,0C4.7,0,0,4.7,0,10.4
              c0,11.4,16.9,19.2,16.9,19.2S33.8,21.8,33.8,10.4C33.8,4.7,29.1,0,23.6,0z"
            fill="#FF6B6B"
          />
        </Svg>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput placeholder="Enter your username" style={styles.input} />
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.buttonForgot}
          onPress={() => console.log("Forgot Password pressed")}
        >
          <Text style={styles.buttonText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSignup}
          onPress={() => console.log("Sign Up pressed")}
        >
          <Text style={styles.buttonTextSignup}>Sign up here 💕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFC0C9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 50
  },
  heart: {
    position: "absolute",
  },
  form: {
    width: 240,
    padding: 20,
    alignItems: "center",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    marginBottom: 5,
    alignSelf: "flex-start",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    fontFamily: "poppins_400Regular",
    fontSize: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  titleContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: "DancingScript_700Bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    marginTop: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    bottom:40,
    left: 5,
  },
  buttonForgot: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FFFFF",
    left: 10,
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  buttonSignup: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FFFFF",
    left: 25,
  },
  buttonTextSignup: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});

