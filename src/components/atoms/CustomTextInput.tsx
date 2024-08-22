/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {Colors} from '@colors';
import {fonts} from '../../../src/assets/fonts';
import {TouchableOpacity} from 'react-native';
import {EyeCloseIcon, EyeOpenIcon} from '@svgs';

interface InputProp {
  control?: any;
  initialValue?: object | any;
  name?: string | number | any;
  isRequired: boolean | any;
  placeholderColor: string;
  placeHolder?: string;
  showLeftIcon?: boolean | any;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
  maxLength: number;
  secureTextEntry: boolean;
  showToggleEye: boolean;
  toggleSecurePassword?: () => void;
  returnKeyType:
    | 'none'
    | 'done'
    | 'search'
    | 'default'
    | 'go'
    | 'next'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call';
  allowFontScaling?: boolean;
  marginVertical?: number;
  errors?: any;
  width?: number | string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?:
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'gender'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'new-password'
    | 'nickname'
    | 'one-time-code'
    | 'organization'
    | 'organization-title'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'url'
    | 'username'
    | 'username-new'
    | 'off';
  cursorColor?: string;
  maxFontSizeMultiplier?: number;
  numberOfLines?: number;
  textAlignVertical?: 'auto' | 'bottom' | 'center' | 'top';
  multiLine: boolean;
  style?: any;
  editable?: boolean | any;
  leftIcon?: any;
  handleToggleEye?: () => void;
  height?: any;
}

export const CustomTextInput: React.FC<InputProp> = ({
  control,
  initialValue,
  name,
  isRequired,
  placeholderColor,
  placeHolder,
  keyboardType,
  maxLength,
  secureTextEntry,
  returnKeyType,
  allowFontScaling,
  errors,
  autoCapitalize = 'sentences',
  maxFontSizeMultiplier = 1,
  numberOfLines,
  textAlignVertical = 'auto',
  multiLine = false,
  editable = true,
  showToggleEye = false,
  handleToggleEye = () => {},
  height = 45,
  // cursorColor=''
}) => {
  // const theme = useSelector((state: any) => state.themes.themeMode);
  //   const LeftIcon: any = SVGs[leftIcon];
  return (
    <Controller
      control={control}
      rules={{
        required: isRequired,
      }}
      render={({
        field: {ref, onChange, onBlur, value},
        fieldState: {error},
      }: any) => (
        <>
          <View
            style={[
              styles.inputView,
              {flexDirection: 'row', height: height, alignItems: 'center'},
            ]}>
            <TextInput
              //   ref={ref}
              maxFontSizeMultiplier={maxFontSizeMultiplier}
              autoCapitalize={autoCapitalize}
              numberOfLines={numberOfLines}
              returnKeyType={returnKeyType}
              testID={name}
              value={value}
              textAlignVertical={textAlignVertical}
              allowFontScaling={allowFontScaling}
              placeholderTextColor={placeholderColor}
              placeholder={placeHolder}
              style={[
                styles.inputView,
                {
                  height: height,
                  flex: 1,
                  borderColor: errors
                    ? Colors.light.danger
                    : Colors.light.inputBg,
                },
              ]}
              keyboardType={keyboardType}
              onBlur={onBlur}
              editable={editable}
              onChangeText={onChange}
              multiline={multiLine}
              // value={initialValue ? initialValue : value}
              maxLength={maxLength}
              secureTextEntry={secureTextEntry}
            />
            {showToggleEye && (
              <TouchableOpacity activeOpacity={0.8} onPress={handleToggleEye}>
                {!secureTextEntry ? (
                  <EyeCloseIcon width={20} height={20} />
                ) : (
                  <EyeOpenIcon width={20} height={20} />
                )}
              </TouchableOpacity>
            )}
          </View>
          {error?.message && (
            <Text style={styles.errorText}>{error.message}</Text>
          )}
        </>
      )}
      defaultValue={initialValue}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: Colors.light.inputBg,
    borderRadius: 25,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 13,
    height: 45,
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 13,
    fontFamily: fonts.primary.semiBold,
    color: Colors.light.danger,
  },
});
