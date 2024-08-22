/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '@colors';
import {
  BackChevronIcon,
  FavoriteOutlineIcon,
  ReportIcon,
  ShareIcon,
} from '@svgs';

import {globalStyles} from '../../../../src/styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

const TransparentHeader = ({
  handleShare = () => {},
  handleReport = () => {},
}) => {
  const navigation: any = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        top: 20,
        justifyContent: 'space-between',
        zIndex: 100,
      }}>
      <TouchableOpacity
        style={{
          zIndex: 1000,
        }}
        onPress={() => navigation.goBack()}>
        <BackChevronIcon
          fill={Colors.light.background}
          width={30}
          height={30}
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity onPress={handleShare} style={{}}>
          <ShareIcon fill={Colors.light.background} width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginVertical: 12}}>
          <FavoriteOutlineIcon
            fill={Colors.light.background}
            width={30}
            height={30}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReport}>
          <ReportIcon fill={Colors.light.background} width={30} height={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransparentHeader;
