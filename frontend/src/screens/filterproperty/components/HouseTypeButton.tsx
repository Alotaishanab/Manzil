/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';
import * as SVGs from '../../../assets/svgs';
import {globalStyles} from '../../../../src/styles/globalStyles';

const HouseTypeButtons = ({
  iconWidth,
  iconHeight,
  options,
  selectedBtn,
  handleSelect,
}: any) => {
  return (
    <View style={globalStyles.simpleRow}>
      {options?.map(
        (option: {
          icon: string | number;
          name:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined;
        }) => {
          const Icon: any = SVGs[option?.icon];
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSelect(option?.name)}
              style={[
                styles.btnStyle,
                {
                  borderWidth: selectedBtn === option.name ? 0 : 1,
                  borderColor: Colors.light.greyDescription,
                  backgroundColor:
                    selectedBtn === option.name
                      ? Colors.light.filterLine
                      : Colors.light.background,
                },
              ]}>
              <Icon width={50} height={50} />
              <Text style={styles.btnText}>{option.name}</Text>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default React.memo(HouseTypeButtons);

const styles = StyleSheet.create({
  btnStyle: {
    // height: 100,
    flex: 1,
    paddingVertical: 10,
    // paddingHorizontal: 5,
    width: 130,
    marginLeft: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.filterLine,
  },
  btnText: {
    fontSize: 11,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
});
