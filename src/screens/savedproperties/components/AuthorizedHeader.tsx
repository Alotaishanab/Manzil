// src/screens/AuthorizedHeader.tsx

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fonts } from '../../../../src/assets/fonts';
import { Colors } from '@colors';
import { useIntl } from '@context';
import { AddPropertyBack } from '@components'; // Import the Back Button
import { useNavigation } from '@react-navigation/native'; // Import navigation

const AuthorizedHeader = () => {
  const { intl } = useIntl();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

  return (
    <View style={styles.headerView}>
      {/* Back Button */}
      <AddPropertyBack
        text={intl.formatMessage({ id: 'savedPropertyScreen.saved' })}
        onPress={handleBackPress}
      />
    </View>
  );
};

export default AuthorizedHeader;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.light.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  inputStyle: {
    borderWidth: 1,
    paddingHorizontal: 20,
    height: 45,
    fontFamily: fonts.primary.regular,
    borderColor: Colors.light.background,
    borderRadius: 5,
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.light.headingTitle,
    fontSize: 22,
    fontFamily: fonts.tertiary.bold,
  },
});

