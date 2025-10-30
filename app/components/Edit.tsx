import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import HandleAPIRequest from './HandleAPIRequest';
import NotifyMessages from '../helper/NotifyMessages';
import { useLocalSearchParams } from 'expo-router';
import EventEdit from './EventEdit';
import ReminderEdit from './ReminderEdit';
import PartnerEdit from './PartnerEdit';

export default function Edit() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // INFO:: will store all the info about comingfrom and Id in the url params
  const { ComingFrom, Id } = useLocalSearchParams<{ ComingFrom: string; Id: string }>();
  console.log("Edit screen params:", { ComingFrom, Id });
  
  useEffect(() => {
    async function loadData() {
      HandleAPIRequest.HandleGetByIdRequest(
        String(ComingFrom),
        String(Id),
        (data) => {
          setData(data);
          console.log("Data loaded:", data);
          setLoading(false);
          NotifyMessages.notifySuccess("Data loaded successfully!");
        },
        (error) => {
          console.error("Get user request failed:", error);
          setLoading(false);
          NotifyMessages.notifyError("Failed to load user data.");
        }
      );
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading data...</Text>
      </View>
    );
  }

  // INFO:: will render the edit screen based on where you are coming from
  return (
    ComingFrom === 'events' ? (
      <LinearGradient colors={["#FDE2E2", "#F9C5C5"]} style={styles.container}>
        <EventEdit data={data} />
      </LinearGradient>
    ) : ComingFrom === 'reminders' ? (
      <LinearGradient colors={["#FDE2E2", "#F9C5C5"]} style={styles.container}>
        <ReminderEdit data={data} />
      </LinearGradient>
    ) : (
      <LinearGradient colors={["#FDE2E2", "#F9C5C5"]} style={styles.container}>
        <PartnerEdit data={data} />
      </LinearGradient>
    )
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
