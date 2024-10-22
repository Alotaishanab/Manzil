import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useIntl } from '@context';
import { fonts } from '../../../assets/fonts/index';
import { RegaIcon } from '@assets'; // Assuming you are importing the custom icon

const TitleValueRow = ({ title, value, onPress }) => (
  <TouchableOpacity
    style={styles.row}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.valueText}>{value}</Text>
  </TouchableOpacity>
);

const AdInfo = () => {
  const intl = useIntl();

  const copyToClipboard = (value: string) => {
    Alert.alert("Copied to Clipboard", `${value} has been copied.`);
  };

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            Real Estate Authority Info
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Display information rows */}
        <TitleValueRow
          title="Advertising License Number"
          value="321"
          onPress={() => copyToClipboard("321")}
        />
        <TitleValueRow
          title="Unified Number Establishment"
          value="25"
          onPress={() => copyToClipboard("25")}
        />
        <TitleValueRow
          title="FAL License No"
          value="7"
          onPress={() => copyToClipboard("7")}
        />
        <TitleValueRow
          title="Date Registration"
          value="2024/06/29"
          onPress={() => copyToClipboard("2024/06/29")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10, // Adjusted for padding consistency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
    overflow: 'hidden',
  },
  titleWrap: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16, // Consistent font size for titles
    fontFamily: fonts.primary.bold, // Use bold font for emphasis
    color: '#000',
    flex: 1,
    textAlign: 'center', // Center align for titles
  },
  headingIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    width: '100%',
  },
  titleText: {
    fontSize: 14, // Consistent font size with description
    color: '#333',
    fontFamily: fonts.primary.regular,
    flex: 1,
    paddingHorizontal: 10, // Consistent padding
  },
  valueText: {
    fontSize: 14, // Adjusted font size
    color: '#000',
    fontFamily: fonts.primary.bold,
    textAlign: 'right',
    paddingHorizontal: 10, // Consistent padding
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
});

export default AdInfo;
