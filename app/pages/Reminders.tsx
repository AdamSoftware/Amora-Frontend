import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import TopLeft from "../components/TopLeft";
import TopRight from "../components/TopRight";
import GenericAPIHelper from "../helper/GenericAPIHelper";
import UserHelper from "../helper/user";
import formateTime from "../helper/formateTime";
import { scaleFont } from "../helper/FontHelpers.js";

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
    async function fetchData() {
      try {
        const remindersData = await GenericAPIHelper.GenericAPIGet(`/reminders/user/${UserHelper.id}`);
        const reservationsData = await GenericAPIHelper.GenericAPIGet(`/reservations/user/${UserHelper.id}`);
        
        const remindersArray = Array.isArray(remindersData) ? remindersData : [remindersData];
        const reservationsArray = Array.isArray(reservationsData) ? reservationsData : [reservationsData];

        const remindersWithTitle = await Promise.all(
          remindersArray.map(async (reminder: any) => {
            const res = reservationsArray.find(r => r.Id === reminder.ReservationId);
            let EventTitle = "";
            let title = "";

            if (res?.ResterantId) {
              const restaurant = await GenericAPIHelper.GenericAPIGet(`/restaurants/${res.ResterantId}`);
              title = "Restaurant: " + (restaurant?.Name || "Unknown");
            } else if (res?.VenueId) {
              const venue = await GenericAPIHelper.GenericAPIGet(`/venues/${res.VenueId}`);
              title = "Venue: " + (venue?.Name || "Unknown");
            } else if (res?.ExperienceId) {
              const exp = await GenericAPIHelper.GenericAPIGet(`/experiences/${res.ExperienceId}`);
              title = "Experience: " + (exp?.Name || "Unknown");
            }

            if (res?.EventId) {
              const event = await GenericAPIHelper.GenericAPIGet(`/events/${res.EventId}`);
              EventTitle = "Event: " + (event?.Name || "Unknown");
            }

            return { ...reminder, title , EventTitle };
          })
        );

        setReminders(remindersWithTitle);
        setReservations(reservationsArray);
      } catch (err) {
        console.error("Error fetching reminders/reservations:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(id)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) return <AppLoading />;
  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <View style={styles.WelcomeContainer}>
          <TopLeft />
        </View>

        <View style={styles.TopRightContainer}>
          <TopRight currentPage={"Reminders"} />
        </View>

        <FlatList
          data={[...reminders, { Id: "add", title: "Add New Reminder" }]}
          keyExtractor={item => item.Id.toString()}
          contentContainerStyle={styles.cardsWrapper}
          ListHeaderComponent={
            <View style={styles.titleContainer}>
              <Text style={styles.appTitle}>Reminders</Text>
            </View>
          }
          renderItem={({ item }) => {
            if (item.Id === "add") {
              return (
                <TouchableOpacity style={[styles.card, styles.addCard]} onPress={() => console.log("Add Reminder")}>
                  <Text style={[styles.cardTitle, styles.addCardText]}>{item.title}</Text>
                </TouchableOpacity>
              );
            }

            return (
              <Swipeable renderRightActions={() => renderRightActions(item.Id.toString())}>
                <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardTitle}>{item.EventTitle}</Text>
                  <Text style={styles.cardDescription}>
                    Scheduled: {new Date(item.ScheduledDate).toLocaleDateString("en-US",{
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })} at {formateTime(item.ScheduledTime)}
                  </Text>
                  <Text style={styles.cardStatus}>
                    Reminder: {formateTime(item.ReminderTime)}
                  </Text>
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />
      </View>
    </GestureHandlerRootView>
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

  TopRightContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },

  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  appTitle: {
    fontFamily: "DancingScript_700Bold",
    fontSize: scaleFont(50),
    color: "#000",
    marginBottom: 10,
  },

  cardsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    padding: 30,
  },

  card: {
    backgroundColor: "#D58A94",
    width: 340,
    borderRadius: 15,
    margin: 15,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  addCard: {
    backgroundColor: "#F4A7B9",
  },

  cardTitle: {
    fontFamily: "DancingScript_700Bold",
    fontSize: scaleFont(25),
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
    marginTop: 5,
    color: "#000",
    textAlign: "center",
  },
  cardStatus: {
    fontFamily: "Poppins_400Regular",
    fontSize: scaleFont(15),
    color: "#000",
    marginTop: 3,
    textAlign: "center",
  },

  deleteButton: {
    backgroundColor: "#E63946",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginVertical: 15,
    borderRadius: 15,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: scaleFont(18),
  },
});


