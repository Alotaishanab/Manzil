import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../assets/fonts';
import {Colors} from '@colors';
import {BackIcon, ExploreIcon, FilterIcon} from '@svgs';
import {useNavigation} from '@react-navigation/native';
import {useIntl} from '@context';

const ExploreSearchHeader = ({onFocusInput = () => {}}) => {
  const navigation: any = useNavigation();
  const {intl} = useIntl();
  return (
    <View style={styles.mainWrap}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={{top: 5, height: 40, width: 40}}>
        <BackIcon color={Colors.light.headingTitle} width={50} height={50} />
      </TouchableOpacity>

      <View style={styles.exploreWrap}>
        <ExploreIcon width={30} height={30} />
        {/* explore.search-placeholder */}
        <TextInput
          placeholderTextColor={Colors.light.headingTitle}
          placeholder={intl.formatMessage({
            id: 'landPropertyDetailScreen.search-house-prices',
          })}
          style={styles.inputStyle}
          onFocus={onFocusInput}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.filterBtn}>
        <FilterIcon width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

export default ExploreSearchHeader;

const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    alignItems: 'center',
  },
  exploreWrap: {
    borderRadius: 25,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 12,
    backgroundColor: Colors.light.inputBg,
  },
  exploreText: {
    marginHorizontal: 20,
    fontSize: 12,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  filterBtn: {
    borderWidth: 1.5,
    borderRadius: 17,
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderColor: Colors.light.filterLine,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 10,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
});
