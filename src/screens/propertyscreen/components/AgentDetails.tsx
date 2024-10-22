import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useIntl } from '@context';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../../assets/fonts/index';
import { UserIcon } from '@assets'; // Importing the UserIcon component

const TitleValueRow = ({ title, value, onPress, style }) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
    <Text style={[styles.titleText, style?.titleStyle]}>{title}</Text>
    <Text style={[styles.valueText, style?.valueStyle]}>{value}</Text>
  </TouchableOpacity>
);

const TitleArrowIconWrap = ({ headingTitle, showIcon = true, style }) => (
  <View style={styles.titleWrap}>
    <Text style={[styles.title, style]}>{headingTitle}</Text>
    {showIcon && (
      <Image source={require('../../../assets/images/authorityIcon.png')} style={styles.headingIcon} />
    )}
  </View>
);

const AgentDetails = () => {
  const { intl } = useIntl();
  const navigation = useNavigation();
  const [isIndependent, setIsIndependent] = useState(true); // Example state to show independent or agency

  const handleVisitPress = () => {
    navigation.navigate('AgencyDetails');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          <TitleArrowIconWrap
            headingTitle={intl.formatMessage({
              id: 'agencyScreen.advertiser-information',
            })}
            showIcon={false}
            style={styles.titleStyle}
          />

          {/* Show UserIcon or Agency Image */}
          <View style={styles.iconWrapper}>
            {isIndependent ? (
              <UserIcon width={75} height={75} /> // Displaying the UserIcon for independent agents
            ) : (
              <Image
                source={require('../../../assets/images/agencies/ag1.png')} // Replace with actual agency image
                style={styles.agencyImage}
              />
            )}
          </View>

          {/* Row Items with interactive feedback */}
          <TitleValueRow
            title={intl.formatMessage({
              id: 'agencyScreen.advertiser-name',
            })}
            value={'Savills Agency'}
            onPress={() => { /* Handle Press */ }}
            style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }}
          />
          <TitleValueRow
            title={intl.formatMessage({
              id: 'agencyScreen.advertiser-type',
            })}
            value={'Agency'}
            onPress={() => { /* Handle Press */ }}
            style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }}
          />
          <TitleValueRow
            title={intl.formatMessage({
              id: 'agencyScreen.advertiser-date-registration',
            })}
            value={'2024/06/29'}
            onPress={() => { /* Handle Press */ }}
            style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }}
          />

          {/* Visit Button */}
          <TouchableOpacity
            style={styles.visitButton}
            onPress={handleVisitPress}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel={intl.formatMessage({ id: 'buttons.visit' })}
            accessibilityRole="button"
          >
            <Text style={styles.visitButtonText}>
              {intl.formatMessage({ id: 'buttons.visit' })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    alignItems: 'center', // Center items inside the card
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
  visitButton: {
    width: '50%',
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Adjusted to give more spacing
  },
  visitButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  iconWrapper: {
    marginVertical: 15,
    alignItems: 'center',
  },
  agencyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
});

export default AgentDetails;
