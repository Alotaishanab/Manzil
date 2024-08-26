import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GreenBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Est. ﷼22,559/mo</Text>
      <Text style={styles.text}>Get pre-qualified</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#90ee90', // Light green color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginTop: -20, // Move the GreenBar up by 10 pixels
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default GreenBar;
