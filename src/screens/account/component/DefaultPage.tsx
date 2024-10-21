import React, { useState } from 'react';
import { logoAccount } from '@assets';
import { Image, StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { CustomButton, TopSpace } from '@components';
import { Colors } from '@colors';
import { fonts } from '../../../../src/assets/fonts';
import { useIntl } from '@context';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import SimpleButtonTextArrow from './SimpleButtonTextArrow';

const DefaultPage = () => {
  const { intl } = useIntl();
  const navigation = useNavigation(); // Use navigation hook
  const [scaleAnim] = useState(new Animated.Value(1)); // Scale animation for press effect

  const handleLegal = () => {};

  // Function to handle press-in effect
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97, // Slightly scale down
      useNativeDriver: true,
    }).start();
  };

  // Function to handle press-out effect and navigate to login screen
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Return to normal scale
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Login'); // Navigate to the login screen, ensure 'Login' matches your route name
    });
  };

  return (
    <View style={{ padding: 24 }}>
      <TopSpace top={15} />
      <Image
        style={defaultPageStyles.imgStyle}
        resizeMode="cover"
        source={logoAccount}
      />
      <TopSpace top={20} />
      <Text style={defaultPageStyles.descriptionText}>
        {intl.formatMessage({ id: 'accountScreen.default.description' })}
      </Text>
      <TopSpace top={20} />

      {/* Updated Animated Button */}
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
      >
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
          <CustomButton
            btnWidth={'100%'}
            disabled={false}
            textSize={14}
            borderRadius={30}
            leftIconColor={Colors.light.background}
            title={intl.formatMessage({ id: 'buttons.sign-in' })}
            showSocialButton={false}
            showRightIconButton={false}
            textButtonWithIcon={true}
            iconName="UserIcon"
          />
        </Animated.View>
      </TouchableOpacity>

      <TopSpace top={50} />
      <Text style={defaultPageStyles.sectionTitle}>
        {intl.formatMessage({ id: 'accountScreen.default.legal' })}
      </Text>

      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({ id: 'accountScreen.default.privacy-policy' })}
      />
      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({ id: 'accountScreen.default.terms-of-use' })}
      />

      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({ id: 'accountScreen.default.privacy-settings' })}
      />
      <TopSpace top={20} />
      <Text style={defaultPageStyles.sectionTitle}>
        {intl.formatMessage({ id: 'accountScreen.default.support' })}
      </Text>
      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({ id: 'accountScreen.default.send-us-feedback' })}
      />
      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({ id: 'accountScreen.default.language' })}
      />
    </View>
  );
};

export default DefaultPage;

const defaultPageStyles = StyleSheet.create({
  descriptionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.light.black,
    fontFamily: fonts.primary.medium,
    width: '75%',
    alignSelf: 'center',
  },
  imgStyle: {
    width: 150,
    alignSelf: 'center',
    height: 150,
  },
  sectionTitle: {
    fontSize: 14,
    color: Colors.light.black,
    fontFamily: fonts.primary.medium,
  },
});
