import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DescriptionBox: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleExpand}>
      <Text style={styles.title}>Description</Text>
      <Text style={styles.description}>
        {/* Placeholder for API data */}
        This is a brief description of the property. It provides an overview of the key features and unique selling points of the property.
      </Text>
      {expanded && (
        <Text style={styles.additionalInfo}>
          {/* Placeholder for API data */}
          More detailed information about the property can be shown here, including amenities, nearby attractions, and historical significance.
        </Text>
      )}
      <Text style={styles.showMoreText} onPress={toggleExpand}>
        {expanded ? 'Show Less' : 'Show More'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20, // Increased padding for a larger box
    marginVertical: 10, // Consistent margin to reduce gaps
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center', // Center the title
    fontFamily: 'Jost',
  },
  description: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Jost',
  },
  additionalInfo: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
    fontFamily: 'Jost',
  },
  showMoreText: {
    marginTop: 10,
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Jost',
    textAlign: 'center', // Center the "Show More" text
  },
});

export default DescriptionBox;
