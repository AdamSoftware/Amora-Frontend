import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { UserLoginHelper, goToSignup } from "../app/helper/user.js";

const { width, height } = Dimensions.get("window");

const scaleFont = (size) => {
  const scale = width / 375;
  return Math.round(size * scale);
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
    <KeyboardAvoidingView style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>Amora🖤</Text>
          <Text style={styles.subtitle}>
            Plan, date, and adventure with the love of your life.
          </Text>

          <Image
            source={require("../assets/images/couple.png")}
            style={styles.coupleImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Username..."
              placeholderTextColor="#fff"
              style={styles.input}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Password..."
              placeholderTextColor="#fff"
              style={styles.input}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => console.log("Forgot Password pressed")}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => UserLoginHelper.login(username, password)}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingSignUp}
        onPress={() => goToSignup()}
      >
        <Text style={styles.buttonText}>Sign up 💕</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#E7D8C9",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollWrapper: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  appTitle: {
    fontSize: scaleFont(60),
    fontFamily: "DancingScript_700Bold",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: scaleFont(16),
    fontFamily: "Poppins_400Regular",
    color: "#000",
    marginTop: 8,
    textAlign: "center",
  },
  coupleImage: {
    width: width * 0.6,
    height: height * 0.27,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 8,
  },
  form: {
    width: "100%",
    maxWidth: 320,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4A7B9",
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins_400Regular",
    fontSize: scaleFont(14),
    paddingVertical: 12,
  },
  buttonLogin: {
    backgroundColor: "#F4A7B9",
    paddingVertical: 11,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginTop: 30,
    width: "55%",
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    fontSize: scaleFont(14),
    textAlign: "center",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  forgotText: {
    color: "#000",
    fontFamily: "Poppins_400Regular",
    fontSize: scaleFont(12),
  },
  floatingSignUp: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "#F4A7B9",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});

