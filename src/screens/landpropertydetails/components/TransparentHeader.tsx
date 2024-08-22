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

const TransparentHeader = () => {
  const navigation: any = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        top: 20,
        zIndex: 100,
        justifyContent: 'space-between',
        // alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackChevronIcon
          fill={Colors.light.background}
          width={30}
          height={30}
        />
      </TouchableOpacity>

      <View style={{flex: 1, paddingHorizontal: 20, alignItems: 'flex-end'}}>
        <TouchableOpacity>
          <FavoriteOutlineIcon
            fill={Colors.light.background}
            width={30}
            height={30}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 10}}>
          <ShareIcon fill={Colors.light.background} width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity>
          <ReportIcon fill={Colors.light.background} width={30} height={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransparentHeader;
