import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import TopLeft from "../components/TopLeft";
import TopRight from "../components/TopRight";


export default function Reminders() {
  let [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
  });
  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={styles.wrapper}>
      <View style={styles.WelcomeContainer}>
        <TopLeft />
      </View>
      <View style={styles.TopRightContainer}>
        <TopRight currentPage={"Reminders"}/>
      </View>
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>reminder Page</Text>
          <Text style={styles.subtitle}>
            This is where reminder details will be displayed.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#E7D8C9",
  },  
  WelcomeContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  WelcomeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 24,
    color: "#333",
  },
  TopRightContainer: {
    alignItems:  "center",
    marginTop: 60,
    marginBottom: 20,
  },
  scrollWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  appTitle: {
    fontFamily: "DancingScript_700Bold",
    fontSize: 48,
    color: "#ff6f61",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});


