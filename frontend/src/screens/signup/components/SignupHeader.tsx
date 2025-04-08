/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {globalStyles} from '@globalStyles';
import {BackChevronIcon} from '@svgs';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import {useIntl} from '@context';
import {useNavigation} from '@react-navigation/native';

const SignupHeader = ({title, step = 1, showSteps = true}: any) => {
  const {intl} = useIntl();
  const navigation = useNavigation();

  return (
    <View
      style={[
        globalStyles.rowSpaceBetween,
        {
          justifyContent: showSteps ? 'space-between' : 'flex-start',
        },
      ]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={style.circleBtn}>
        <BackChevronIcon width={24} height={24} />
      </TouchableOpacity>

      <Text
        style={[
          style.headerTitle,
          {
            textAlign: showSteps ? 'auto' : 'center',
            flex: showSteps ? 0 : 1,
          },
        ]}>
        {title}
      </Text>
      {showSteps && (
        <Text style={style.stepText}>
          {/*  */}
          {intl.formatMessage({id: 'requestPropertyScreen.step'})} {step}/
          {intl.formatMessage({id: 'requestPropertyScreen.step-3'})}
        </Text>
      )}

      {/* <Tou */}
    </View>
  );
};

export default SignupHeader;

const style = StyleSheet.create({
  circleBtn: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: Colors.light.backBtn,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.tertiary.bold,
    fontSize: 28,
    color: Colors.light.headingTitle,
    // fontWeight: '600',
  },
  stepText: {
    top: 6,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: Colors.light.primaryBtn,
  },
});
