/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {
  CustomButton,
  CustomTextInput,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import ChooseVerificationMethod from './components/ChooseVerificationMethod';
import {useValidations} from '../../validations/useValidations';
import {useCreateAccountProps} from './useCreateAccountProps';
import {styles} from './styles';
import {globalStyles} from '../../styles/globalStyles';
import CountryPickerInput from './components/CountryPickerInput';
import {useNavigation} from '@react-navigation/native';
import SignupHeader from '../signup/components/SignupHeader';

export const CreateAccount = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const {creatAccountSchema} = useValidations();
  const {handleCategory, selectedCategory} = useCreateAccountProps();

  type FormData = {
    email: string | number | any;
  };
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(creatAccountSchema),
  });

  const {
    control: numberControl,
    handleSubmit: handleSubmitNumber,
    watch: phoneWatch,
    formState: {errors: errorsNumber},
  } = useForm();

  const handleSignup = (data: FormData) => {
    console.log('data', data);
    if (isValid) {
      navigation.navigate('SignupOtpVerification', {
        type: 'signup',
      });
    }
  };

  const handleSignupNumber = (data: any) => {
    console.log('data', data);
    navigation.navigate('SignupOtpVerification');
    // if (isValid) {
    // }
  };

  // console.log('ohone',ph)
  const phoneNumber = phoneWatch('phoneNumber');
  console.log('phoneNumber', phoneNumber);
  const handleGoogleLogin = () => {};
  const handleAppleLogin = () => {};

  const handleSignin = () => {
    navigation.navigate('Login');
  };
  return (
    <Screen showKeyboardAware={true}>
      <SignupHeader
        title={intl.formatMessage({id: 'signupScreen.header'})}
        step={intl.formatMessage({id: 'requestPropertyScreen.step-2'})}
      />
      <TopSpace top={30} />

      <Text style={styles.headingText}>
        {intl.formatMessage({id: 'signupScreen.enter-phone'})}
      </Text>

      <Text style={styles.needVerifyText}>
        {intl.formatMessage({id: 'signupScreen.need-verify'})}
      </Text>
      <TopSpace top={25} />

      <TopSpace top={30} />

      <CountryPickerInput control={numberControl} name="phoneNumber" />

      <TopSpace top={30} />
      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={
          selectedCategory === 'Email'
            ? handleSubmit(handleSignup)
            : handleSubmitNumber(handleSignupNumber)
        }
        title={intl.formatMessage({id: 'buttons.register'})}
        showRightIconButton={true}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={[globalStyles.simpleRow, {justifyContent: 'center'}]}>
          <Text style={styles.forgotPasswordText}>
            {intl.formatMessage({id: 'signupScreen.already-registered'})}
          </Text>
          <Pressable onPress={() => handleSignin()}>
            <Text style={styles.forgotPasswordText}>
              {''} {intl.formatMessage({id: 'buttons.sign-in'})}
            </Text>
          </Pressable>
        </View>
      </View>
      <TopSpace top={25} />
    </Screen>
  );
};
