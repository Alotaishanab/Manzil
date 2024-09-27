import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';
import {useIntl} from '@context';
import {CustomButton, TopSpace} from '@components';
import {UserIcon, mapsearch} from '@assets';

const UnauthorizedContent = ({setIsLoggedin}: any) => {
  const {intl} = useIntl();
  const handleSearchProperty = () => {};
  const handleLogin = () => {
    setIsLoggedin(true);
  };
  return (
    <View>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          {intl.formatMessage({
            id: 'savedPropertyScreen.saved-properties',
          })}
        </Text>
      </View>

      <View style={[styles.largeView, {marginTop: 2}]}>
        <TopSpace top={40} />
        <Text style={styles.titleText}>
          {intl.formatMessage({
            id: 'savedPropertyScreen.no-saved-properties',
          })}
        </Text>
        <TopSpace top={10} />
        <Text style={styles.descriptionText}>
          {intl.formatMessage({
            id: 'savedPropertyScreen.save-favorite',
          })}
        </Text>

        <Image
          resizeMode="contain"
          style={styles.imgStyle}
          source={mapsearch}
        />

        <TopSpace top={40} />
        {/* <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={handleSearchProperty}
          title={intl.formatMessage({
            id: 'savedPropertyScreen.search-properties',
          })}
          showRightIconButton={false}
        /> */}
        <TopSpace top={20} />

        <CustomButton
          borderRadius={30}
          showSocialButton={false}
          marginLeft={0}
          title={intl.formatMessage({
            id: 'buttons.sign-in',
          })}
          handleClick={handleLogin}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default UnauthorizedContent;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.light.background,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.light.headingTitle,
    fontSize: 22,
    fontFamily: fonts.tertiary.bold,
  },
  sortView: {
    backgroundColor: Colors.light.background,
    height: 80,
    borderRadius: 5,
    margin: 7,
    padding: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  sortText: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: Colors.light.headingTitle,
  },
  largeView: {
    // margin: 7,
    flexGrow: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 5,
    padding: 20,
    marginTop: 0,
  },
  titleText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.secondary.bold,
    fontSize: 26,
  },
  descriptionText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
  },
  imgStyle: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  signinBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 10,
    backgroundColor: Colors.light.primaryBtn,
    alignItems: 'center',
  },
  signinBtnText: {
    color: Colors.light.background,
    fontSize: 15,
    fontFamily: fonts.primary.medium,
    marginLeft: 10,
  },
});
