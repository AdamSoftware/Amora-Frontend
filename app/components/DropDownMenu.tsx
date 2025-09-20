import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useFonts, DancingScript_700Bold } from "@expo-google-fonts/dancing-script";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function DropDownMenu() {
  const [ShowMenu, setShowMenu] = useState(false);

  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
  });

  const toggleMenu = () => {
    setShowMenu(!ShowMenu);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="menu" size={30} color="#000" />
      </TouchableOpacity>
      {ShowMenu && (
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Home</Text>
          <Text style={styles.menuItem}>Profile</Text>
          <Text style={styles.menuItem}>Settings</Text>
          <Text style={styles.menuItem}>Logout</Text>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "flex-end",
    bottom: 40,
    right: 25,
  },
  menu: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 5,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#333",
  },
})



