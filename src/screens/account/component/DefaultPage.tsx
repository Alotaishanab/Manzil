import React from 'react';
import {logoAccount} from '@assets';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CustomButton, TopSpace} from '@components';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';
import {useIntl} from '@context';
import SimpleButtonTextArrow from './SimpleButtonTextArrow';

const DefaultPage = () => {
  const {intl} = useIntl();
  const handleLegal = () => {};
  // const handleTermsOfUse = () => {};
  // const handlePrivacySettings = () => {};
  return (
    <View style={{padding: 24}}>
      <TopSpace top={15} />
      <Image
        style={defaultPageStyles.imgStyle}
        resizeMode="cover"
        source={logoAccount}
      />
      <TopSpace top={20} />
      <Text style={defaultPageStyles.descriptionText}>
        {intl.formatMessage({id: 'accountScreen.default.description'})}
      </Text>
      <TopSpace top={20} />
      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        textSize={14}
        borderRadius={30}
        leftIconColor={Colors.light.background}
        handleClick={undefined}
        title={intl.formatMessage({id: 'buttons.sign-in'})}
        showSocialButton={false}
        showRightIconButton={false}
        textButtonWithIcon={true}
        iconName="UserIcon"
      />
      <TopSpace top={50} />

      <Text style={defaultPageStyles.sectionTitle}>
        {intl.formatMessage({id: 'accountScreen.default.legal'})}
      </Text>

      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({id: 'accountScreen.default.privacy-policy'})}
      />
      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({id: 'accountScreen.default.terms-of-use'})}
      />

      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({
          id: 'accountScreen.default.privacy-settings',
        })}
      />
      <TopSpace top={20} />
      <Text style={defaultPageStyles.sectionTitle}>
        {intl.formatMessage({id: 'accountScreen.default.support'})}
      </Text>
      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({
          id: 'accountScreen.default.send-us-feedback',
        })}
      />
      <SimpleButtonTextArrow
        handleClick={handleLegal}
        title={intl.formatMessage({
          id: 'accountScreen.default.language',
        })}
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
