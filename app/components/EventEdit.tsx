import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import BackBtn from './BackBtn';

export default function EventEdit(Data: any) {
  // This should have all the data that will be needed to be displayed
  const [data, setData] = useState<any>(Data.data);

  console.log("EventEdit data:", data);

  return (
    <View style={styles.container}>
      <View style={styles.BackBtn}>
        <BackBtn />
      </View>
      <Text>Edit Event Screen for ID: {data?.Id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
