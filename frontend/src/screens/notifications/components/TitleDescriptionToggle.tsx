/* eslint-disable react-native/no-inline-styles */
import {Colors} from '@colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import {fonts} from '../../../../src/assets/fonts';
import {globalStyles} from '../../../../src/styles/globalStyles';
import {TopSpace} from '@components';

type TitleDescriptionToggleProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  title: string;
  description: string;
};

const TitleDescriptionToggle: React.FC<TitleDescriptionToggleProps> = ({
  toggle = false,
  setToggle,
  title,
  description,
}) => {
  console.log('title', title);
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TopSpace top={5} />
      <View
        style={[
          globalStyles.rowSpaceBetween,
          {
            alignItems: 'flex-start',
          },
        ]}>
        <Text style={styles.description}>{description}</Text>

        <ToggleSwitch
          isOn={toggle}
          onColor={Colors.light.primaryBtn}
          trackOffStyle={{
            width: 43,
            backgroundColor: Colors.light.grey,
          }}
          trackOnStyle={{
            width: 43,
          }}
          labelStyle={{
            // color: "black",
            fontWeight: '900',
          }}
          size="medium"
          onToggle={
            () => {
              setToggle(!toggle);
              // handleToggle(toggle ? false : true, id)
            }
            // setToggle(!toggle)
          }
        />
      </View>
    </View>
  );
};
export default React.memo(TitleDescriptionToggle);

const styles = StyleSheet.create({
  title: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
  description: {
    color: Colors.light.grey,
    fontSize: 14,
    width: '70%',
    fontFamily: fonts.primary.regular,
  },
});
