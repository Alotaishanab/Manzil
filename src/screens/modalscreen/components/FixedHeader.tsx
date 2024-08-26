import {Colors} from '@colors';
import {BackChevronIcon, FavoriteOutlineIcon, ShareIcon} from '@svgs';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {fonts} from '../../../assets/fonts';
import {globalStyles} from '../../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

const FixedHeader = () => {
  const navigation: any = useNavigation();
  return (
    <View style={fixedHeaderStyles.mainWrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackChevronIcon
          // fill={Colors.light.background}
          width={30}
          height={30}
        />
      </TouchableOpacity>

      <View style={fixedHeaderStyles.centeredView}>
        <Text style={fixedHeaderStyles.centeredHeader}>$1200</Text>
        <Text style={fixedHeaderStyles.centeredDescription}>
          3 bed terraced house to rent
        </Text>
      </View>

      <View style={globalStyles.simpleRow}>
        <TouchableOpacity style={{marginRight: 10}}>
          <ShareIcon fill={Colors.light.headingTitle} width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 10}}>
          <FavoriteOutlineIcon
            fill={Colors.light.headingTitle}
            width={30}
            height={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FixedHeader;

const fixedHeaderStyles = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
  },
  centeredView: {
    alignItems: 'center',
  },
  centeredHeader: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 13,
  },
  centeredDescription: {
    color: Colors.light.greyDescription,
    fontFamily: fonts.primary.medium,
    fontSize: 12,
  },
});
