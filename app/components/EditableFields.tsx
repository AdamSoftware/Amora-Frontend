import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { scaleFont } from '../helper/FontHelpers';

export default function EditableField({
  label,
  value,
  editMode,
  onChangeText,
}: {
  label: string;
  value: any;
  editMode: boolean;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={fieldStyles.container}>
      <Text style={fieldStyles.label}>{label}</Text>
      {editMode ? (
        <TextInput
          style={fieldStyles.input}
          value={value?.toString()}
          onChangeText={onChangeText}
        />
      ) : (
        <Text style={fieldStyles.value}>{value?.toString()}</Text>
      )}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: scaleFont(16),
    color: '#000',
  },
  input: {
    fontSize: scaleFont(16),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
});
