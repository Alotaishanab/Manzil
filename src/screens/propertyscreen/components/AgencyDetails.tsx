import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import TitleValueRow from '../../agencydetails/components/TitleValueRow';
import TitleArrowIconWrap from '../../agencydetails/components/TitleArrowIconWrap';
import { useIntl } from '@context';
import { CustomButton, TopSpace } from '@components';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
    <View style={styles.container}>
      <TitleArrowIconWrap
        showIcon={false}
        headingTitle={intl.formatMessage({
          id: 'agencyScreen.advertiser-information',
        })}
        showRightArrowToggle={false}
        isVisible={showAuthorityInfo}
        setIsVisible={setShowAuthorityInfo}
      />

      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.advertiser-name',
        })}
        value={'Savills Agency'}
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.advertiser-type',
        })}
        value={'Agency'}
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.advertiser-date-registration',
        })}
        value={'2024/06/29'}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: width, // Ensure it fits the screen width
    height: height, // Ensure it fits the screen height
    backgroundColor: 'white', // Ensure proper background color
  },
  savisWrap: {
    marginTop: 20,
    alignItems: 'center',
  },
  savisText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AgencyDetails;
