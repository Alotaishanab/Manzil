/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {globalStyles} from '@globalStyles';
import {ChevronDownIcon, ChevronUpIcon} from '@svgs';
import * as SVGs from '../../../assets/svgs';
import {fonts} from '@fonts';
import {Colors} from '@colors';

const TitleArrowIconWrap = ({
  headingTitle = 'Properties Listed',
  showIcon = false,
  icon = 'InfoIcon',
  isVisible,
  setIsVisible = () => {},
  showRightArrowToggle = true,
}: any) => {
  const Icon = SVGs[icon];
  return (
    <>
      <View style={[globalStyles.rowSpaceBetween, {marginVertical: 4}]}>
        <View style={globalStyles.simpleRow}>
          <Text style={styles.heading}>{headingTitle}</Text>
          {showIcon && <Icon width={20} height={20} />}
        </View>

        {showRightArrowToggle && (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            {isVisible ? (
              <ChevronDownIcon width={20} height={20} />
            ) : (
              <ChevronUpIcon width={20} height={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default TitleArrowIconWrap;

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 14,
    color: Colors.light.headingTitle,
  },
});
