/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';
import {globalStyles} from '../../../../src/styles/globalStyles';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import * as SVGs from '../../../assets/svgs';

const BedroomView = ({
  selectedOption,
  setSelectedOption,
  iconName = 'BedIcon',
  title,
  data,
}: any) => {
  const Icon: any = SVGs[iconName];

  return (
    <View>
      <View style={globalStyles.simpleRow}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Icon width={35} height={35} />
      </View>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{marginVertical: 5}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedOption(item)}
              style={[
                styles.btnStyle,
                {
                  backgroundColor:
                    selectedOption === item
                      ? Colors.light.primaryBtn
                      : Colors.light.background,
                  marginLeft: index === 0 ? 0 : 5,
                },
              ]}>
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      selectedOption === item
                        ? Colors.light.background
                        : Colors.light.headingTitle,
                  },
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default React.memo(BedroomView);

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 14,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    marginRight: 5,
  },
  btnStyle: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 35,
    borderWidth: 1,
    borderColor: Colors.light.greyDescription,
  },
  optionText: {
    fontSize: 14,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
});
