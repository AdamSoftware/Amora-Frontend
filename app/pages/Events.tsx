import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import TopLeft from "../components/TopLeft";
import TopRight from "../components/TopRight";
import GenericAPIHelper from "../helper/GenericAPIHelper";
import UserHelper from "../helper/user";
import { Swipeable } from "react-native-gesture-handler";
import { scaleFont } from "../helper/FontHelpers.js";
import { LinearGradient } from "expo-linear-gradient";
import { fetchEvents } from "../helper/FetchReminders";
import EmptyList from "../components/EmptyList";

const { width, height } = Dimensions.get("window");

export default function Events() {
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      const mapped = await fetchEvents(UserHelper.id);
      setEvents(mapped);
      setLoading(false);
    }
    loadEvents();
  }, []);

  if (!fontsLoaded) return <AppLoading />;
  if (loading)
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;

  const renderRightActions = (id: string) => (
    <View style={styles.swipeActionsContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setEvents((prev) => prev.filter((e) => e.id !== id));
          GenericAPIHelper.GenericAPIDelete(`/events/${id}`);
        }}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => console.log("Edit event:", id)}
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEventCard = (item: any) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => console.log("Open Event:", item.title)}
        activeOpacity={0.8}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>

        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: item.isActive === "Active" ? "#4CAF50" : "#E63946" },
            ]}
          >
            <Text style={styles.badgeText}>{item.isActive}</Text>
          </View>

          <View style={styles.dateBadge}>
            <Text style={styles.badgeText}>{item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <LinearGradient colors={["#FDE2E2", "#F9C5C5"]} style={styles.wrapper}>
      <View style={styles.headerContainer} />
        <View style={styles.WelcomeContainer}>
          <TopLeft />
        </View>
        <View style={styles.TopRightContainer}>
          <TopRight currentPage={"Events"} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>Events</Text>
        </View>
      <View />
      <EmptyList ListName={events} Name="event" />
      <FlatList
        style={styles.listContainer}
        data={events}
        keyExtractor={(item) => item.id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsWrapper}
        renderItem={({ item }) => renderEventCard(item)}
      />

      <TouchableOpacity
        style={styles.addCardFixed}
        onPress={() => console.log("Open Add Event form")}
        activeOpacity={0.8}
      >
        <Text style={styles.addIcon}>+</Text>
        <Text style={[styles.cardTitle, styles.addCardText]}>Add New Event</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
  },
  WelcomeContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  TopRightContainer: {
    alignItems: "center",
    marginTop: 80,
    position: "relative",
    zIndex: 2000,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  appTitle: {
    fontFamily: "DancingScript_700Bold",
    fontSize: scaleFont(50),
    color: "#ff6f5f",
  },
  listContainer: {
    flex: 1,
  },
  cardsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: 100,
  },
  card: {
    alignSelf: "center",
    backgroundColor: "#FFB6B9",
    width: "90%",
    height: height * 0.2,
    borderRadius: 30,
    marginVertical: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 9,
  },
  addCardFixed: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#F4A7B9",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 6,
  },
  addIcon: {
    fontSize: scaleFont(30),
    fontWeight: "bold",
    marginRight: 10,
    color: "#000",
  },
  cardTitle: {
    fontFamily: "DancingScript_700Bold",
    fontSize: scaleFont(30),
    textAlign: "center",
    color: "#000",
    padding: 4,
  },
  addCardText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: scaleFont(28),
  },
  cardDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: scaleFont(15),
    lineHeight: scaleFont(22),
    marginTop: 8,
    color: "#000",
    textAlign: "center",
  },
  badgeContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
    width: "100%",
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dateBadge: {
    backgroundColor: "#1D3557",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: scaleFont(13),
    color: "#fff",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#E63946",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 15,
    marginVertical: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: scaleFont(18),
  },
  editButton: {
    backgroundColor: "#4CAF50",
    marginTop: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 15,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: scaleFont(18),
  },
  swipeActionsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

