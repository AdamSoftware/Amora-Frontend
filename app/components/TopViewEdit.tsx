import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TopViewEditProps {
  onSelect: (tab: string) => void;
  activeTab: string;
  EditMode?: boolean;
}

export default function TopViewEdit({ onSelect, activeTab, EditMode = true }: TopViewEditProps) {
  // Don't render anything if edit mode is false
  if (!EditMode) return null;

  const tabs = ['Events', 'Reservations', 'Gifts'];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => !isActive && onSelect(tab)}
            disabled={isActive} // prevents pressing the active one
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>

            {isActive && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007bff10',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activeTabText: {
    color: '#007bff',
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: '60%',
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
});

