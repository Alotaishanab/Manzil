/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {fonts} from '@fonts';
import {Colors} from '@colors';

const DropDownPickerComponent = ({
  dropdownWidth = '50%',
  showSearch = false,
  value,
  data,
  isFocus,
  setIsFocus,
  labelField,
  valueField,
  placeholder,
  onChange,
  containerWidth = '45%',
  dropdownBgColor = Colors.light.inputBg,
  focusBgColor = Colors.light.primaryBtn,
  borderRadius = 8,
}: any) => {
  console.log('isFocus:', isFocus);
  return (
    <Dropdown
      style={[
        styles.dropdown,
        {
          width: dropdownWidth,
          borderColor: dropdownBgColor,
          borderRadius: borderRadius,
          backgroundColor: dropdownBgColor,
        },
        isFocus && {borderColor: focusBgColor},
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search={showSearch}
      maxHeight={300}
      placeholder={placeholder || 'Search...'}
      searchPlaceholder={placeholder || 'Search...'}
      value={value}
      labelField={labelField}
      valueField={valueField}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={onChange}
      containerStyle={{
        width: containerWidth,
        zIndex: 1000,
        elevation: 1000,
      }}
      // renderLeftIcon={() => (

      // )}
    />
  );
};

const DropDownPicker = React.memo(DropDownPickerComponent);
export {DropDownPicker};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    // zIndex: 1000,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.light.inputBg,
    width: '50%',
    borderWidth: 0.5,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 8,
    paddingHorizontal: 14,
    zIndex: 1000,
    elevation: 1000,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    // zIndex: 1000,
  },
});
