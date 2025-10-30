
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scaleFont } from '../helper/FontHelpers';

export default function DateField({
  label,
  value,
  editMode,
  onChange,
}: {
  label: string;
  value: string | Date;
  editMode: boolean;
  onChange: (date: Date) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const dateValue = typeof value === 'string' ? new Date(value) : value;

  // Show picker automatically when editMode is enabled
  useEffect(() => {
    if (editMode) {
      setShowPicker(true);
    } else {
      setShowPicker(false);
    }
  }, [editMode]);

  const handleChange = (event: any, selectedDate?: Date) => {
    // On Android, event.type === 'dismissed' when user cancels
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View style={{ marginBottom: 15,}}>
      <Text
        style={{
          fontSize: scaleFont(14),
          fontWeight: '500',
          color: '#555',
          marginBottom: 5,
        }}
      >
        {label}
      </Text>

      {!editMode && (
        <Text style={{ fontSize: scaleFont(16) }}>
          {dateValue.toLocaleDateString()}
        </Text>
      )}

      {showPicker && (
        <DateTimePicker
          value={dateValue || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}

