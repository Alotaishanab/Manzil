import React from 'react';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BackIcon, ReloadIcon} from '@svgs';
import {useNavigation} from '@react-navigation/native';
import {useIntl} from '@context';

const FilterHeader = () => {
  const navigation = useNavigation();
  const {intl} = useIntl();
  return (
    <View style={styles.mainWrap}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={{}}>
        <BackIcon width={50} height={50} />
      </TouchableOpacity>

      <Text style={styles.headerText}>
        {intl.formatMessage({
          id: 'filterPropertyScreen.header',
        })}
      </Text>

      <TouchableOpacity activeOpacity={0.8}>
        <ReloadIcon width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
  },
});
