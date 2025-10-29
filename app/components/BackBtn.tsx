import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../helper/FontHelpers';
import { Ionicons } from '@expo/vector-icons';

export default function BackBtn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={scaleFont(24)} color="#d64b72" />
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#d64b72',
    fontSize: scaleFont(18),
    marginLeft: 5,
    fontWeight: '500',
  },
});

