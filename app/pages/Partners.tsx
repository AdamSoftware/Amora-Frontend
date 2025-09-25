import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import TopLeft from "../components/TopLeft";
import TopRight from "../components/TopRight";
import GenericAPIHelper from "../helper/GenericAPIHelper";
import UserHelper from "../helper/user";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background

const { width, height } = Dimensions.get("window");

export default function Partners() {
  const translateX = useSharedValue(0);
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
  });

  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [partners, setPartners] = useState<
    Array<{
      id: string;
      Nickname: string;
      Firstname: string;
      Lastname: string;
      Birthday: string;
      Anniversary: string;
      Phonenumber: string;
    }>
  >([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await GenericAPIHelper.GenericAPIGet("/partners/user/" + UserHelper.id);
        let eventsArray = [];
        if (Array.isArray(data)) {
          eventsArray = data;
        } else if (data) {
          eventsArray = [data];
        }

        const mapped = eventsArray.map((e: any) => {
          const rawBirthday = e.Birthdate || "";
          const formattedBirthday = rawBirthday
            ? new Date(rawBirthday).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "No birthday set";
          const rawAnniversary = e.Anniversary || "";
          const formattedAnniversary = rawAnniversary
            ? new Date(rawAnniversary).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "No anniversary set";

          return {
            id: e.Id.toString(),
            Nickname: e.Nickname || "No nickname set",
            Firstname: e.Firstname || "No first name set",
            Lastname: e.Lastname || "No last name set",
            Birthday: formattedBirthday,
            Anniversary: formattedAnniversary,
            Phonenumber: e.Phonenumber || "No phone number set",
          };
        });

        setPartners(mapped);
      } catch (error) {
        console.error("Error fetching events:", error);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (!fontsLoaded) return <AppLoading />;
  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const SWIPE_THRESHOLD_X = 50;

  const handleEdit = (partner: any) => {
    Alert.prompt(
      "Edit Partner Nickname",
      "Enter new nickname:",
      [
        { text: "Cancel", style: "cancel" },
        // Add update logic here
      ],
      "plain-text",
    );
  };

  const addPartner = () => {
    console.log("Add Partner button pressed");
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -SWIPE_THRESHOLD_X) {
        if (currentIndex < partners.length - 1) {
          runOnJS(setCurrentIndex)(currentIndex + 1);
        }
      } else if (event.translationX > SWIPE_THRESHOLD_X) {
        runOnJS(handleEdit)(partners[currentIndex]);
      }
      translateX.value = withSpring(0);
    });

  if (partners.length === 0) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.TopLeft}><TopLeft /></View>
        <View style={styles.TopRight}><TopRight currentPage={"Partners"} /></View>
        <Text style={styles.Title}>Partners</Text>
        <Text style={{ marginTop: 150, fontSize: 20 }}>No partners yet.</Text>
        <TouchableOpacity onPress={addPartner} style={styles.addButton}>
          <Text style={styles.addButtonText}>➕ Add Partner</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentPartner = partners[currentIndex];

  return (
    <View style={styles.wrapper}>
      <View style={styles.TopLeft}><TopLeft /></View>
      <View style={styles.TopRight}><TopRight currentPage={"Partners"} /></View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.partnerCard, cardStyle]}>
          <LinearGradient
            colors={['#FDF6F0', '#FFEDE6']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.gradientBackground}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.partnerName}>{currentPartner.Firstname} {currentPartner.Lastname}</Text>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.detailRow}>
                <Text style={styles.icon}>✨</Text>
                <Text style={styles.label}>Nickname:</Text>
                <Text style={styles.value}>{currentPartner.Nickname}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.icon}>🎂</Text>
                <Text style={styles.label}>Birthday:</Text>
                <Text style={styles.value}>{currentPartner.Birthday}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.icon}>💌</Text>
                <Text style={styles.label}>Anniversary:</Text>
                <Text style={styles.value}>{currentPartner.Anniversary}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.icon}>📞</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{currentPartner.Phonenumber}</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </GestureDetector>

      <TouchableOpacity onPress={addPartner} style={styles.addButton}>
        <Text style={styles.addButtonText}>➕ Add Partner</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#E7D8C9",
  },
  Title: {
    fontFamily: "DancingScript_700Bold",
    fontSize: 48,
    color: "#ff6f61",
    textAlign: "center",
  },
  TopLeft: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  TopRight: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  partnerCard: {
    width: width * 0.9,
    minHeight: height * 0.65,
    alignSelf: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 5,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 15,
  },
  partnerName: {
    fontFamily: "DancingScript_700Bold",
    fontSize: 50,
    color: "#ff6f61",
    backgroundColor: "#FFCCC5",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    textAlign: 'center',
  },
  cardBody: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#FFF0E5",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#aa7d70",
    width: 120,
  },
  value: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#333",
  },
  addButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#ff6f61",
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

