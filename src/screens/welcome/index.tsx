/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {CustomButton, Screen, TopSpace} from '@components';
import {Pressable, View, Text, Image, TouchableOpacity} from 'react-native';
import {globalStyles} from '../../../src/styles/globalStyles';
import {Colors} from '@colors';
import {styles} from './styles';
import {AppleIcon, ArrowForwardIcon, GoogleIcon} from '@svgs';
import {manzil2} from '@assets';
import {useIntl} from '@context';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '@fonts';
import nafath from 'assets/images/nafath.png'; // Import the image

export const Welcome = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleContinueGuest = () => {
    navigation.navigate('BottomTabNavigator');
  };
  const handleSignup = () => {
    navigation.navigate('Signup');
  };
  return (
    <Screen padding={0} showKeyboardAware={true}>
      <View style={styles.topWrap}>
        <Pressable
          onPress={handleContinueGuest}
          style={[globalStyles.simpleRow, {alignSelf: 'flex-end'}]}>
          <Text style={styles.continueGuestText}>
            {intl.formatMessage({id: 'welcomeScreen.continue-guest'})}
          </Text>
          <ArrowForwardIcon width={30} height={30} />
        </Pressable>
        <View style={styles.imgView}>
          <Image
            source={manzil2}
            resizeMode="cover"
            style={styles.logoImgStyle}
          />
        </View>
      </View>

      <TopSpace top={8} />
      <View
        style={{
          flexGrow: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 24,
          backgroundColor: Colors.light.offWhite,
        }}>
        <View style={styles.sheetLine} />
        <TopSpace top={35} />
        <CustomButton
          btnWidth={'100%'}
          disabled={false}
          borderRadius={30}
          fontFamily={fonts.primary.regular}
          handleClick={handleSignup}
          title={intl.formatMessage({id: 'buttons.sign-up'})}
          showRightIconButton={false}
        />
        <TopSpace top={20} />

        <TouchableOpacity onPress={handleLogin} style={styles.shadowBtn}>
          <Text style={styles.shadowBtnText}>
            {intl.formatMessage({id: 'buttons.sign-in'})}
          </Text>
        </TouchableOpacity>
        <TopSpace top={20} />

        <View style={globalStyles.simpleRow}>
          <View style={globalStyles.orLine} />
          <Text style={globalStyles.orLineText}>
            {intl.formatMessage({id: 'signinScreen.or'})}
          </Text>
          <View style={globalStyles.orLine} />
        </View>

        <TopSpace top={20} />

        <TouchableOpacity style={[globalStyles.socialBtn, { alignItems: 'center', justifyContent: 'center' }]}>
            <Image source={nafath} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>

        <TopSpace top={20} />
      </View>
    </Screen>
  );
};
