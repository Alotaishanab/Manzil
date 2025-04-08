import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@colors';

interface PickerFieldProps {
  label: string;             // Label for the picker field (e.g., "Beds", "Direction")
  value: string | number;    // Current selected value
  onPress: () => void;       // Function to open the picker modal or handle the click event
  error?: string;            // Optional error message to display below the picker
}

export const PickerField: React.FC<PickerFieldProps> = ({ label, value, onPress, error }) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.label}>{label}: {value}</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    marginVertical: 8,
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 5,
  },
});

export default PickerField;