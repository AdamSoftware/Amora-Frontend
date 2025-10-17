import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import UserHelper from "../helper/user.js";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import NotifyMessages from "../helper/NotifyMessages.js";


const { width } = Dimensions.get("window");


const scaleFont = (size) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export default function TopLeft() {
  const [welcome, setWelcome] = useState("");
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
  });


  // Always call hooks before any return
  useEffect(() => {
    setWelcome(`Welcome, ${UserHelper.firstname || "Guest"}!`);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.WelcomeContainer}>
      <TouchableOpacity
        onPress={() => {
          router.push("/pages/User");
        }}
        style={styles.profileIcon}
      >
        <Ionicons name="person-circle" size={scaleFont(40)} color="#2c2c2c" />
      </TouchableOpacity>
      <Text style={styles.WelcomeText}>{welcome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  WelcomeContainer: {
    position: "absolute",
    alignItems: "flex-start",
    top: 10,
    left: 20,
  },
  WelcomeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: scaleFont(18),
    color: "#4A7C59",
    marginLeft: 40, 
  },
  profileIcon: {
    position: "absolute",
    top: -10,
    left: -10,
  },
});

