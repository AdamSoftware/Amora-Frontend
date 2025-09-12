
import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { UserLoginHelper, goToSignup } from "../app/helper/user.js";

const { width, height } = Dimensions.get("window");

const positionHeart = (topPercent: number, leftPercent: number) => ({
  top: height * topPercent,
  left: width * leftPercent,
});


const scaleFont = (size: number) => {
  const scale = width / 375;
  const newSize = size * scale;
  return Math.round(newSize);
};

export default function Index() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  let [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ImageBackground style={styles.wrapper} source={require("../assets/images/LoginBackground.png")}>
      <Svg 
        height={height/2} 
        width={width} 
        viewBox=".8 0 32 30.6" 
        style={styles.heart}
      >
        <Path
          d="M23.6,0c-2.6,0-5,1.2-6.6,3.2C15.4,1.2,13,0,10.4,0C4.7,0,0,4.7,0,10.4
            c0,11.4,16.9,19.2,16.9,19.2S33.8,21.8,33.8,10.4C33.8,4.7,29.1,0,23.6,0z"
          fill="#800020"
          opacity={1.0}
        />
      </Svg>

      <ScrollView 
        contentContainerStyle={styles.scrollWrapper} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to Amora 💕</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Firstname</Text>
          <TextInput
            placeholder="Enter your Firstname"
            style={styles.input}
            onChangeText={setUsername}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            style={styles.input}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomWrapper}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => console.log("Forgot Password pressed")}
          >
            <Text style={styles.buttonText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => goToSignup()}
          >
            <Text style={styles.buttonText}>Sign up 💕</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => UserLoginHelper.login(username, password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFC0C9",
    alignItems: "center",
    justifyContent: "center",
  },
  heartDecor: {
    position: "absolute",
  },
  scrollWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heart: {
    position: "absolute",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: scaleFont(33),
    fontFamily: "DancingScript_700Bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: scaleFont(16),
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  form: {
    width: "90%",
    maxWidth: 320,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    marginBottom: 5,
    fontSize: scaleFont(15),
    alignSelf: "center",
  },
  input: {
    width: "90%",
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    bottom: 5,
    fontFamily: "Poppins_400Regular",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    textAlign: "center",
    fontSize: scaleFont(14),
  },
  bottomWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 30,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: "#800020",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 10,
  },
  buttonLogin: {
    backgroundColor: "#800020",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    fontSize: scaleFont(15),
    textAlign: "center",
    justifyContent: "center",
  },
});

