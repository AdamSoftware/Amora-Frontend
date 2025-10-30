import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { scaleFont } from "../helper/FontHelpers";
import { Attachedgifts, Attachedreservations } from "../helper/GetAttachedData";

interface AttachedEventItemsProps {
  eventId: string;
}

export default function AttachedEventItems({ eventId }: AttachedEventItemsProps) {
  const [attachedGifts, setAttachedGifts] = useState<any[]>([]);
  const [attachedReservations, setAttachedReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadAttachedData = async () => {
      setLoading(true);
      try {
        const giftData = await Attachedgifts(eventId);
        const reservationData = await Attachedreservations(eventId);

        if (isMounted) {
          setAttachedGifts(giftData ? (Array.isArray(giftData) ? giftData : [giftData]) : []);
          setAttachedReservations(
            reservationData ? (Array.isArray(reservationData) ? reservationData : [reservationData]) : []
          );
        }
      } catch (error) {
        console.error("Failed to load attached data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (eventId) loadAttachedData();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />;
  }

  const renderGift = (item: any) => {
    const gift = item.gift_details?.[0] || {};
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{gift.name || "Unnamed Gift"}</Text>
        {gift.description && <Text style={styles.cardDescription}>{gift.description}</Text>}
        {gift.price && <Text style={styles.cardPrice}>Price: ${gift.price}</Text>}
        {item.quantity && <Text>Quantity: {item.quantity}</Text>}
      </View>
    );
  };

  const renderReservation = (res: any) => {
    const title =
      res.restaurant_details?.restaurant_name || res.experience_details?.experience_name || "Reservation";
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.partnerText}>Partner: {res.partner_name}</Text>
        <Text style={styles.partysize}>Party Size: {res.party_size}</Text>
        <Text style={styles.Time}>Time: {new Date(res.reservation_time).toLocaleString()}</Text>
        {res.special_requests && <Text style={styles.Special}>Request: {res.special_requests}</Text>}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Gifts</Text>
      {attachedGifts.length > 0 ? (
        <FlatList
          data={attachedGifts}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
          renderItem={({ item }) => renderGift(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No gifts attached.</Text>
      )}

      <Text style={styles.sectionHeader}>Reservations</Text>
      {attachedReservations.length > 0 ? (
        <FlatList
          data={attachedReservations}
          keyExtractor={(item, index) => item?.reservation_id?.toString() || index.toString()}
          renderItem={({ item }) => renderReservation(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No reservations attached.</Text>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: scaleFont(22),
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 20,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 15,
    marginRight: 16,
    minWidth: 200,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    borderLeftWidth: 6,
    borderLeftColor: "#007AFF", // accent color on the left
  },
  cardTitle: {
    fontSize: scaleFont(20),
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  cardDescription: {
    fontSize: scaleFont(15),
    color: "#555",
    marginBottom: 6,
    lineHeight: 20,
  },
  cardPrice: {
    fontSize: scaleFont(15),
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 4,
  },
  noDataText: {
    color: "#888",
    fontSize: scaleFont(14),
    marginBottom: 8,
  },
  partnerText: {
    fontSize: scaleFont(16),
    color: "#555",
    marginBottom: 4,
  },
  partysize: {
    fontSize: scaleFont(16),
    color: "#555",
    marginBottom: 4,
  },
  Time: {
    fontSize: scaleFont(16),
    color: "#555",
    marginBottom: 4,
  },
  Special: {
    fontSize: scaleFont(16),
    color: "#555",
    marginTop: 4,
  }, 
});

