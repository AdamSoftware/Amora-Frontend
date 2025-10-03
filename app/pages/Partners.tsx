import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
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
import { Swipeable } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import {fetchPartners} from "../helper/FetchReminders";



const { width, height } = Dimensions.get("window");

export default function Partners() {
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
    Poppins_400Regular,
  });

  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    async function loadPartners() {
      const mapped = await fetchPartners(UserHelper.id);
      setPartners(mapped);
      setLoading(false);
   }
    loadPartners();
 }, []);

  if (!fontsLoaded) return <AppLoading />;
  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const handleDelete = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    GenericAPIHelper.GenericAPIDelete(`/partners/${id}`);
  };

  const handleEdit = (partner: any) => {
    console.log("Edit Partner:", partner);
  };

  const renderRightActions = (partner: any) => (
    <View style={styles.swipeActionsContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(partner.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEdit(partner)}
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#FDE2E2", "#F9C5C5"]} style={styles.wrapper}>
      <View style={styles.TopLeft}><TopLeft /></View>
      <View style={styles.TopRight}><TopRight currentPage={"Partners"} /></View>

      {partners.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 150, justifyContent: "center", alignSelf: "center"}}>
          <Text style={{ fontSize: 20, fontFamily: "Poppins_400Regular"}}>Looks like we couldn't find your partner</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>➕ Add Partner</Text>
          </TouchableOpacity>
        </View>
      ) : (
        partners.map((partner) => (
          <Swipeable
            key={partner.id}
            renderRightActions={() => renderRightActions(partner)}
          >
            <View style={styles.partnerCard}>
              <LinearGradient
                colors={["#FFD8D8", "#FFB6B6"]}
                style={styles.gradientBackground}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.partnerName}>
                    {partner.Firstname} {partner.Lastname}
                  </Text>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.detailRow}>
                    <Text style={styles.icon}>✨</Text>
                    <Text style={styles.label}>Nickname:</Text>
                    <Text style={styles.value}>{partner.Nickname}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.icon}>🎂</Text>
                    <Text style={styles.label}>Birthday:</Text>
                    <Text style={styles.value}>{partner.Birthday}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.icon}>💌</Text>
                    <Text style={styles.label}>Anniversary:</Text>
                    <Text style={styles.value}>{partner.Anniversary}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.icon}>📞</Text>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.value}>{partner.Phonenumber}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Swipeable>
        ))
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1,
  },
  Title: {
    fontFamily: "DancingScript_700Bold",
    fontSize: 48,
    color: "#ff6f5f",
    marginBottom: 10,
    textAlign: "center",
  },
  TopLeft: {
    marginTop: 60,
    marginBottom: 20,
  },
  TopRight: {
    marginTop: 60,
    marginBottom: 20,
    zIndex: 2000,
    position: "relative",
  },
  partnerCard: {
    width: width * 0.9,
    minHeight: height * 0.65,
    alignSelf: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 23,
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
    fontSize: 60,
    color: "#000",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    textAlign: "center",
    backgroundColor: "#FBA7B9",
  },
  cardBody: { flex: 1, justifyContent: "space-evenly" },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#FFD8D8",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: { fontSize: 24, marginRight: 8 },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#111",
    width: 120,
  },
  value: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#000",
  },
  addButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F4A7B9",
    borderRadius: 30,
    width: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  addButtonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  swipeActionsContainer: {
    justifyContent: "center",
    flexDirection: "column",
  },
  deleteButton: {
    backgroundColor: "#E63946",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 120,
    borderRadius: 15,
    marginHorizontal: 5,
    marginTop: 10,
  },
  deleteText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  editButton: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 120,
    borderRadius: 15,
    marginHorizontal: 5,
    marginTop: 10,
  },
  editText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18 
  },
});

