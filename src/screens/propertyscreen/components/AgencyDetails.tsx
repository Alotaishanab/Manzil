import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useIntl } from '@context';
import { CustomButton, TopSpace } from '@components';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Define TitleArrowIconWrap component directly in this file
const TitleArrowIconWrap: React.FC<{
  headingTitle: string;
  showIcon?: boolean;
  showRightArrowToggle?: boolean;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  style?: object;
}> = ({ headingTitle, showIcon = true, showRightArrowToggle = true, isVisible, setIsVisible, style }) => {
  return (
    <View style={styles.titleWrap}>
      <Text style={[styles.title, style]}>{headingTitle}</Text>
    </View>
  );
};

// Define TitleValueRow component directly in this file
const TitleValueRow: React.FC<{ title: string; value: string; style?: { titleStyle?: object; valueStyle?: object } }> = ({ title, value, style }) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.titleText, style?.titleStyle]}>{title}</Text>
      <Text style={[styles.valueText, style?.valueStyle]}>{value}</Text>
    </View>
  );
};

const AgencyDetails: React.FC = () => {
  const { intl } = useIntl();
  const [showAuthorityInfo, setShowAuthorityInfo] = useState(true);
  const [agencyData, setAgencyData] = useState<any>(null); // State for holding API data

  const navigation = useNavigation(); // Hook for navigation

  const handleVisit = () => {
    navigation.navigate('AgencyDetails'); // Navigate to 'AgencyDetails' screen
  };

  useEffect(() => {
    // Uncomment the following code to fetch data from API when it's available

    // const fetchAgencyDetails = async () => {
    //   try {
    //     const response = await fetch('https://api.example.com/agency-details');
    //     const data = await response.json();
    //     setAgencyData(data);
    //   } catch (error) {
    //     console.error('Error fetching agency details:', error);
    //   }
    // };
    // fetchAgencyDetails();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TitleArrowIconWrap
        showIcon={false}
        headingTitle={intl.formatMessage({
          id: 'agencyScreen.advertiser-information',
        })}
        showRightArrowToggle={false}
        isVisible={showAuthorityInfo}
        setIsVisible={setShowAuthorityInfo}
        style={{ titleStyle: styles.textStyle }} // Apply custom text style to title
      />

      {/* Use the locally defined TitleValueRow component */}
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.advertiser-name',
        })}
        value={'Savills Agency'}
        style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }} // Pass the correct style prop
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.advertiser-type',
        })}
        value={'Agency'}
        style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }} // Pass the correct style prop
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.advertiser-date-registration',
        })}
        value={'2024/06/29'}
        style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }} // Pass the correct style prop
      />

      <View style={styles.savisWrap}>
        <Text style={styles.savisText}>savills</Text>
      </View>

      <TopSpace top={15} />
      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleVisit}
        title={intl.formatMessage({ id: 'buttons.visit' })}
        btnBg={'transparent'} // Make button background transparent
        borderColor={'green'} // Set button border color
        borderWidth={2} // Set border width
        textColor={'green'} // Set text color to match the border
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: width - 40, // Match the width with the AdInfo container
    alignSelf: 'center', // Center the container horizontally
    padding: 20,
    backgroundColor: 'white', // Ensure proper background color
    borderRadius: 20, // Add rounded corners for visual consistency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    marginVertical: 20,
  },
  savisWrap: {
    marginTop: 20,
    alignItems: 'center',
  },
  savisText: {
    fontSize: 25,
    fontFamily: 'fonts.primary.regular', // Updated to use the primary font
    color: '#000',
  },
  textStyle: {
    fontSize: 18, // Set the font size to 18
    alignItems: 'center',
    fontFamily: 'fonts.primary.regular', // Use the primary font family
    color: '#000', // Set default text color
  },
  titleText: {
    fontSize: 18, // Update size to 18
    color: '#000',
    fontFamily: 'fonts.primary.regular', // Updated to use the primary font
  },
  valueText: {
    fontSize: 18, // Update size to 18
    color: '#000',
    fontFamily: 'fonts.primary.regular', // Updated to use the primary font
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10, // Add vertical padding for better spacing
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Add bottom border for row separation
  },
  titleWrap: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20, // Adjust as needed for your title style
    fontFamily: 'fonts.primary.regular', // Ensure the primary font is used
    color: '#000',
  },
});

export default AgencyDetails;
