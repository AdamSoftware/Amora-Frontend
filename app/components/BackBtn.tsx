import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../helper/FontHelpers';
import { Ionicons } from '@expo/vector-icons';

export default function BackBtn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={scaleFont(24)} color="black" />
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
  },
  backText: {
    color: 'black',
    fontSize: scaleFont(18),
    marginLeft: 5,
  },
});
