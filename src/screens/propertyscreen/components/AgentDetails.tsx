import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { useIntl } from '@context';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../../assets/fonts/index';

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
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleVisitPress = () => {
    setButtonPressed(true);
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

          {/* Savills Branding */}
          <View style={styles.savisWrap}>
            <Text style={styles.savisText}>Savills</Text>
          </View>

          {/* Visit Button */}
          <TouchableOpacity
            style={[
              styles.visitButton,
              buttonPressed && styles.visitButtonPressed,
            ]}
            onPress={handleVisitPress}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel={intl.formatMessage({ id: 'buttons.visit' })}
            accessibilityRole="button"
          >
            <Text style={[styles.visitButtonText, buttonPressed && styles.visitButtonTextPressed]}>
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
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    marginVertical: 15,
    overflow: 'hidden',
  },
  titleWrap: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: '#000',
    flex: 1,
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
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.primary.regular,
    flex: 1,
  },
  valueText: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.primary.bold,
    textAlign: 'right',
  },
  savisWrap: {
    marginTop: 15,
    alignItems: 'center',
  },
  savisText: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: '#000',
  },
  visitButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  visitButtonPressed: {
    backgroundColor: '#4CAF50',
  },
  visitButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  visitButtonTextPressed: {
    color: '#fff',
  },
});

export default AgentDetails;
