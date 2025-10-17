import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TopView({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('User');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); // Pass the selected tab to parent
  };

  return (
    <LinearGradient
      colors={['#FDE2E2', '#F9C5C5']}
      style={styles.container}
    >
      <TouchableOpacity
        style={[styles.tab, activeTab === 'User' && styles.activeTab]}
        onPress={() => handleTabPress('User')}
        activeOpacity={0.8}
      >
        <Text style={[styles.tabText, activeTab === 'User' && styles.activeText]}>
          User
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'Subscriptions' && styles.activeTab]}
        onPress={() => handleTabPress('Subscriptions')}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'Subscriptions' && styles.activeText,
          ]}
        >
          Subscriptions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Settings' && styles.activeTab]}
        onPress={() => handleTabPress('Settings')}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'Settings' && styles.activeText,
          ]}
        >
         Settings 
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: "168%",
    width: '100%',
    elevation: 4,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#FFC1C1',
  },
  tabText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

