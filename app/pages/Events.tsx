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
import TopLeft from "../components/TopLeft";
import TopRight from "../components/TopRight";
import GenericAPIHelper from "../helper/GenericAPIHelper";
import UserHelper from "../helper/user";
import { Swipeable } from "react-native-gesture-handler";

export default function Events() {
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const handleDelete = async (id: string) => {
    try {
      await GenericAPIHelper.GenericAPIDelete(`/events/${id}`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (error) {
      console.error("API DELETE request failed:", error);
    }
  };

  const [events, setEvents] = useState<
    Array<{ id: string; title: string; description: string; isActive: string; date: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await GenericAPIHelper.GenericAPIGet("/events/user/" + UserHelper.id);

        let eventsArray = [];
        if (Array.isArray(data)) {
          eventsArray = data;
        }
        else if (data) {
          eventsArray = [data];
        }


        const mapped = eventsArray.map((e: any) => {
          const rawDate = e.DateOfEvent || "";
          const formattedDate = rawDate
            ? new Date(rawDate).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "No date set";

          return {
            id: e.Id.toString(),
            title: e.Name,
            description: e.Description,
            date: formattedDate,
            isActive: e.IsActive ? "Active" : "Inactive",
          };
        });

        setEvents(mapped);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (!fontsLoaded) return <AppLoading />;
  if (loading)
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        console.log("Delete event:", id);
        setEvents((prev) => prev.filter((e) => e.id !== id));
        handleDelete(id);
      }}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.WelcomeContainer}>
        <TopLeft />
      </View>

      <View style={styles.TopRightContainer}>
        <TopRight currentPage={"Events"} />
      </View>

      <FlatList
        data={[
          ...events,
          { id: "add", title: "Add New Event", description: "", isActive: "", date: "" },
        ]}
        keyExtractor={(item) => item.id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsWrapper}
        ListHeaderComponent={
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>Events</Text>
          </View>
        }
        renderItem={({ item }) => {
          if (item.id === "add") {
            return (
              <TouchableOpacity
                style={[styles.card, styles.addCard]}
                onPress={() => console.log("Open Add Event form")}
                activeOpacity={0.8}
              >
                <Text style={[styles.cardTitle, styles.addCardText]}>{item.title}</Text>
              </TouchableOpacity>
            );
          }

          return (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => console.log("Open Event:", item.title)}
                activeOpacity={0.8}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <Text style={styles.cardStatus}>{"Status: " + item.isActive}</Text>
                <Text style={styles.cardStatus}>{"Date: " + item.date}</Text>
              </TouchableOpacity>
            </Swipeable>
          );
        }}
      />
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
    fontSize: 48,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addCard: {
    backgroundColor: "#F4A7B9",
  },
  cardTitle: {
    fontFamily: "DancingScript_700Bold",
    fontSize: 24,
    textAlign: "center",
    color: "#000",
    padding: 4,
  },
  addCardText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 28,
  },
  cardDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    marginTop: 5,
    color: "#000",
    textAlign: "center",
  },
  cardStatus: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
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
    fontSize: 16,
  },
});

