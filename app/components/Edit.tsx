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
  // TODO:: this will take in the current place you are coming from
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

  // TODO:: Reder a edit screen based on where you are coming from each one will look a little different
  return (
    ComingFrom === 'events' ? (
      <View style={styles.container}>
        <EventEdit data={data} />
      </View>
    ) : ComingFrom === 'reminders' ? (
      <View style={styles.container}>
        <ReminderEdit data={data} />
      </View>
    ) : (
      <View style={styles.container}>
        <PartnerEdit data={data} />
      </View>
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
