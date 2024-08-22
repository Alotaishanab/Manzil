/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {CustomButton, CustomTextInput, Screen, TopSpace} from '@components';
import {useIntl} from '@context';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useValidations} from '@validations';
import SignupHeader from './components/SignupHeader';
import {globalStyles} from '@globalStyles';
import {AppleIcon, GoogleIcon} from '@svgs';
import {useNavigation} from '@react-navigation/native';

export const Signup = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const {signupSchema} = useValidations();
  type FormData = {
    email: string | number | any;
    password: string | number | any;
    name: string;
    confirmPassword: string | any;
  };
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<FormData>({
    defaultValues: {
      name: 'Faisal',
      email: 'khawajfaisal981@gmail.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = (data: FormData) => {
    console.log('data', data);
    // const {email, password} = data;
    if (isValid) {
      navigation.navigate('CreateAccount');
    }
  };

  // const handl

  return (
    <Screen showKeyboardAware={true}>
      <SignupHeader
        title={intl.formatMessage({id: 'signupScreen.sign-up'})}
        step={intl.formatMessage({id: 'requestPropertyScreen.step-1'})}
      />

      <TopSpace top={40} />
      <Text style={styles.inputTitleStyle}>
        {intl.formatMessage({id: 'signupScreen.name'})}
      </Text>

      <CustomTextInput
        control={control}
        name={'name'}
        keyboardType="default"
        returnKeyType="done"
        isRequired={true}
        secureTextEntry={false}
        placeholderColor={''}
        maxLength={70}
        showToggleEye={false}
        multiLine={false}
      />
      <TopSpace top={20} />

      <Text style={styles.inputTitleStyle}>
        {intl.formatMessage({id: 'signupScreen.email'})}
      </Text>
      <CustomTextInput
        control={control}
        name={'email'}
        keyboardType="email-address"
        returnKeyType="done"
        isRequired={true}
        secureTextEntry={false}
        placeholderColor={''}
        maxLength={70}
        showToggleEye={false}
        multiLine={false}
      />
      <TopSpace top={20} />

      <Text style={styles.inputTitleStyle}>
        {intl.formatMessage({id: 'signupScreen.password'})}
      </Text>
      <CustomTextInput
        control={control}
        name={'password'}
        keyboardType="default"
        returnKeyType="done"
        isRequired={true}
        secureTextEntry={true}
        placeholderColor={''}
        maxLength={70}
        showToggleEye={false}
        multiLine={false}
      />
      <TopSpace top={20} />

      <Text style={styles.inputTitleStyle}>
        {intl.formatMessage({id: 'signupScreen.confirm-password'})}
      </Text>

      <CustomTextInput
        control={control}
        name={'confirmPassword'}
        keyboardType="default"
        returnKeyType="done"
        isRequired={true}
        secureTextEntry={true}
        placeholderColor={''}
        maxLength={70}
        showToggleEye={false}
        multiLine={false}
      />
      <TopSpace top={20} />

      <Text style={styles.termServiceNormalText}>
        {intl.formatMessage({id: 'signupScreen.selecting-agree'})}
        <Text
          onPress={() => {
            navigation.navigate('TermsOfUse');
          }}
          style={styles.termServiceBoldText}>
          {' '}
          {intl.formatMessage({id: 'signupScreen.terms-conditions'})}{' '}
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('TermsOfUse');
          }}
          style={styles.termServiceBoldText}>
          <Text
            onPress={() => {
              navigation.navigate('TermsOfUse');
            }}>
            {intl.formatMessage({id: 'signupScreen.payment-terms-conditions'})}{' '}
          </Text>
        </Text>
        <Text style={styles.termServiceNormalText}>
          {intl.formatMessage({id: 'signupScreen.acknowledge'})}
          {/*  */}
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('PrivacyPolicy');
          }}
          style={styles.termServiceBoldText}>
          {' '}
          {intl.formatMessage({id: 'signupScreen.privacy-policy'})}
        </Text>
        <Text />
      </Text>

      <TopSpace top={20} />
      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        fontFamily={fonts.primary.regular}
        handleClick={handleSignup}
        title={intl.formatMessage({id: 'signupScreen.agree-continue'})}
        showRightIconButton={false}
      />
      <TopSpace top={20} />
      <Text
        onPress={() => {
          navigation.navigate('ForgotPassword');
          // Alert.alert('s')
        }}
        style={styles.forgotPass}>
        {intl.formatMessage({id: 'signupScreen.forgot-password'})}
      </Text>
      <TopSpace top={20} />

      <Text style={[globalStyles.orLineText, {textAlign: 'center'}]}>
        {intl.formatMessage({id: 'signinScreen.or'})}
      </Text>
      <TopSpace top={20} />

      <View style={globalStyles.simpleRow}>
        <TouchableOpacity style={styles.socialBtn}>
          <AppleIcon width={25} height={25} />
        </TouchableOpacity>

        <View style={{marginHorizontal: 10}} />

        <TouchableOpacity style={styles.socialBtn}>
          <GoogleIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  inputTitleStyle: {
    fontSize: 13,
    fontFamily: fonts.primary.semiBold,
    color: Colors.light.headingTitle,
  },
  termServiceNormalText: {
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyHeading,
  },
  termServiceBoldText: {
    fontFamily: fonts.primary.medium,
    color: '#5389fe',
  },
  forgotPass: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
  },
  socialBtn: {
    backgroundColor: Colors.light.inputBg,
    width: '46%',
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
