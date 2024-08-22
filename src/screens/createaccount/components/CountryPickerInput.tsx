import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {Controller} from 'react-hook-form';
import {globalStyles} from '../../../styles/globalStyles';
import {fonts} from '../../../assets/fonts';
import {Colors} from '@colors';

const CountryPickerInput = ({control, name}) => {
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState({callingCode: ['1'], cca2: 'US'});

  const onSelect = selectedCountry => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
  };

  return (
    <View style={globalStyles.simpleRow}>
      <View style={styles.countryPickerContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withAlphaFilter
          withCallingCode
          withEmoji
          onSelect={onSelect}
          containerButtonStyle={{}}
        />

        {country !== null && (
          <Text style={styles.callingCodeText}>+{country?.callingCode}</Text>
        )}
      </View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textInput}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="phone-pad"
          />
        )}
        name={name}
        defaultValue=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  countryPickerContainer: {
    height: 50,
    justifyContent: 'center',
    // width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBg,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  callingCodeText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  textInput: {
    backgroundColor: Colors.light.inputBg,
    flex: 1,
    height: 50,
    marginLeft: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
});

export default CountryPickerInput;
