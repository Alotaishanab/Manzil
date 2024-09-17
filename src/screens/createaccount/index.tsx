/* eslint-disable react-native/no-inline-styles */
import React,{useState} from 'react';
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
import {useRegisterUserPhone} from '@services'

export const CreateAccount = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const {createAccountSchema} = useValidations();
  const {handleCategory, selectedCategory} = useCreateAccountProps();
  const { mutate: registerPhone } = useRegisterUserPhone();
  const [country, setCountry] = useState({callingCode: ['1'], cca2: 'US'});

  type FormData = {
    phoneNumber: string | number | any;
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
    resolver: zodResolver(createAccountSchema),
  });

  const {
    control: numberControl,
    handleSubmit: handleSubmitNumber,
    watch: phoneWatch,
    formState: {errors: errorsNumber},
  } = useForm();

  const phoneNumber = phoneWatch('phoneNumber');
 // console.log('phoneNumber', phoneNumber);
 // console.log('country', country);

  const handleSignup = (data: FormData) => {
    console.log('data', data,'isValid', isValid);
    if (isValid) {

      const countryCode = country.callingCode.length > 0 ? country.callingCode[0]:country.callingCode; 
      console.log('countryCode',countryCode,'phoneNumber',phoneNumber)

      registerPhone({phone: `+${countryCode}${phoneNumber}`}, {
        onSuccess: () => {
          // Navigate on success
          navigation.navigate('SignupOtpVerification', {
            type: 'signup',
          });
          
        },
        onError: () => {
          console.error("Registering phone number failed");
        }
      });

      
    }
  };

  const handleSignupNumber = (data: any) => {
    console.log('data', data);
    const countryCode = country.callingCode.length > 0 ? country.callingCode[0]:country.callingCode; 
    console.log('countryCode',countryCode,'phoneNumber',phoneNumber)
    registerPhone({phone: `+${countryCode}${phoneNumber}`}, {
      onSuccess: () => {
        // Navigate on success
        navigation.navigate('SignupOtpVerification');
        
      },
      onError: () => {
        console.error("Registering phone number failed");
      }
    });
    
    
  };

  // console.log('ohone',ph)
  
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

      <CountryPickerInput control={numberControl} name="phoneNumber" onSelectCountry={setCountry} />

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
