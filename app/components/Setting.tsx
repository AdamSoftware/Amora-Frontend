import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Switch, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Setting() {
  // Cannot do this because Async will just keep chaning to the values here
  // const setDarkMode = AsyncStorage.setItem("@dark_mode", JSON.stringify(false));
  // const setNotifications = AsyncStorage.setItem("@notifications", JSON.stringify(true));
  const router = useRouter();
  
  // TODO:: Have to actually make darkmode do something in the app
  // TODO:: Have to make notifications on the app work and then I can link them to the settings
  // to turn on and off notifs

  const [preferences, setPreferences] = useState({
    darkMode: AsyncStorage.getItem("@darkMode"),
    notifications: AsyncStorage.getItem("@notifications"),
  });
  //console.log("Dark Mode:", preferences.darkMode);
  //console.log("Notifications:", preferences.notifications);

  // INFO:: already made the json file with all the info for the app and privacy policy
  // TODO:: make sure that the app info and privacy policy do actaully work and you can grab data from the json
  const AppInfo = () =>{
    // TODO:: make a thing that will show up on the screan that you can scroll through that will display the app info
  }

  const PrivacyPolicy = () => {
    // TODO:: make the pop up that will show you the privacy policy in a scrollable window
  }

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        //console.log("loading preferences", preferences);
        const darkMode = await AsyncStorage.getItem("@darkMode");
        //console.log("Dark Mode from storage:", darkMode);
        const notifications = await AsyncStorage.getItem("@notifications");
        //console.log("Loaded preferences:", { darkMode, notifications });
        setPreferences({
          darkMode: darkMode !== null ? JSON.parse(darkMode) : false,
          notifications: notifications !== null ? JSON.parse(notifications) : true,
        });
        // console.log("DarkMode after setting:", preferences.darkMode);
        // console.log("Notifications after setting:", preferences.notifications);
      } catch (error) {
        console.log("Preferences not set, using defaults.");
        console.log("Failed to load preferences:", error);
      }
    };
    loadPreferences();
  }, []);

  // INFO:: this is tkhe func for a screen to pop up to ask you to confirm deleteing your account
  const confirmDeleteAccount = () => {
    // INFO:: this will ask you if you are sure that you would like to delete your account
    // I still don't know if I will fully be deleteing accounts or just turning them false as active in the db 
    Alert.alert(
      "Confirm Delete Account",
      "Are you sure you would like to delete your account.",
      [
        { 
          text: "Cancel", 
          style: "cancel" 
        },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            deleteAccount();
          }
        },
      ]
    );
    
  }

  const deleteAccount = async () => {
    try {
      await AsyncStorage.clear();
      router.push("../index.tsx");
      console.log("Account was deleted.");
    }
    catch (error) {
      console.log("Failed to delete account:", error);
    }
  }

  // Generic toggle function
  const togglePreference = async (key) => {
    console.log("loading preferences", preferences);
    console.log("toggling", key);
    const newValue = !preferences[key];
    // WARNING : I think this might be the issue with the async stoarge not updateing the darkmode value
    setPreferences((prev) => ({ ...prev, [key]: newValue })); // update state immediately
    try {
      await AsyncStorage.setItem(`@${key}`, JSON.stringify(newValue)); // save immediately
      console.log(`Saved ${key}:`, newValue);
      console.log("Current preferences:", preferences);
    } catch (error) {
      console.log("Failed to save preference:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


      <View style={styles.item}>
        <Text style={styles.itemText}>Enable Notifications</Text>
        <Switch
          value={preferences.notifications}
          onValueChange={() => togglePreference("notifications")}
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.itemText}>Dark Mode</Text>
        <Switch
          value={preferences.darkMode}
          onValueChange={() => togglePreference("darkMode")}
        />
      </View>

      <View style={styles.sectionapp}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>App Version 1.0.0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.deleteAccountContainer}>
        <TouchableOpacity 
          style={[styles.item, 
            { 
              backgroundColor: "#ffe6e6",  
            }]
          }
          onPress={confirmDeleteAccount}
        >
          <Text style={[styles.itemText, { color: "#cc0000", fontSize: 20, width: "100%", textAlign: "center" }]}>Delete Account</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: 
  { 
   flexGrow: 1,
   justifyContent: "flex-start",
   padding: 10,
   paddingBottom: 90,
   marginTop: 20,
  },
  title: 
  { 
   fontSize: 29, 
   alignSelf: "center",
   marginBottom: 30,
  },
  sectionTitle: 
  { 
   fontSize: 18, 
   fontWeight: "600",
   marginTop: 20,
   marginBottom: 10,
  },
  item: 
  { 
   backgroundColor: "#f9f9f9", 
   borderRadius: 10, 
   padding: 15, 
   marginTop: 20,
   marginBottom: 10, 
   flexDirection: "row", 
   justifyContent: "space-between", 
   height: 60,
   textAlign: "center",
   alignItems: "center",
  },
  itemText: 
  { 
   fontSize: 16, 
   color: "#222" 
  },
  deleteAccountContainer: 
  { 
   marginTop: 30,
   alignItems: "center"
  },
  sectionapp: 
  { 
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

