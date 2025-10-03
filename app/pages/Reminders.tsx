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
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
import { scaleFont } from "../helper/FontHelpers.js";
import { LinearGradient } from "expo-linear-gradient";
import formateTime from "../helper/formateTime";
import { fetchRemindersWithTitles } from "../helper/FetchReminders";
import  EmptyList  from "../components/EmptyList";


export default function Reminders() {
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  const [reminders, setReminders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReminders() {
      const { reminders, reservations } = await fetchRemindersWithTitles(UserHelper.id);
      setReminders(reminders);
      setReservations(reservations);
      setLoading(false);
    }

    loadReminders();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await GenericAPIHelper.GenericAPIDelete(`/reminders/${id}`);
      setReminders(prev => prev.filter(r => r.Id.toString() !== id));
    } catch (err) {
      console.error("API DELETE request failed:", err);
    }
  };

  const renderRightActions = (id: string) => (
    <View style={styles.swipeActionsContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={() => console.log("Edit reminder", id)}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderReminderCard = (item: any) => (
    <Swipeable renderRightActions={() => renderRightActions(item.Id.toString())}>

 
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardTitle}>{item.EventTitle}</Text>
        <Text style={styles.cardDescription}>
          Scheduled:{" "}
          {item.ScheduledDate
            ? new Date(item.ScheduledDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "No date set"}{" "}
          at {item.ScheduledTime ? formateTime(item.ScheduledTime) : "--:--"}
        </Text>
        <View style={styles.badgeContainer}>
          <View style={[styles.statusBadge, { backgroundColor: "#4CAF50" }]}>
            <Text style={styles.badgeText}>Active</Text>
          </View>
          <View style={styles.dateBadge}>
            <Text style={styles.badgeText}>
              {item.ReminderTime ? formateTime(item.ReminderTime) : "--:--"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

    </Swipeable>
  );

  if (!fontsLoaded) return <AppLoading />;
  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient colors={["#FDE2E2", "#F9C5C5"]} style={styles.wrapper}>
        <View style={styles.WelcomeContainer}>
          <TopLeft />
        </View>
        <View style={styles.topRightWrapper}>
          <TopRight currentPage={"Reminders"} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>Reminders</Text>
        </View>
        <EmptyList ListName={reminders} Name="reminder" />
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.Id.toString()}
          contentContainerStyle={styles.cardsWrapper}
          renderItem={({ item }) => renderReminderCard(item)}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.addCardFixed}
          onPress={() => console.log("Open Add Reminder form")}
          activeOpacity={0.8}
        >
          <Text style={styles.addIcon}>+</Text>
          <Text style={[styles.cardTitle, styles.addCardText]}>Add Reminder</Text>
        </TouchableOpacity>

     </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: 
  { 
   flex: 1 
  },
  WelcomeContainer: { 
    alignItems: "center", 
    marginTop: 60 
  },
  topRightWrapper: { 
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
  cardsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
  },
  card: {
    alignSelf: "center",
    backgroundColor: "#FFB6B9",
    width: "90%",
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

  cardTitle: {
    fontFamily: "DancingScript_700Bold",
    fontSize: scaleFont(30),
    textAlign: "center",
    color: "#000",
    padding: 4,
  },

  cardDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: scaleFont(15),
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

  swipeActionsContainer: { justifyContent: "center", alignItems: "center" },

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
  addCardText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: scaleFont(28),
  },
});

