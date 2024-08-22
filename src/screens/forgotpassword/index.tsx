import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {
  CustomButton,
  CustomTextInput,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {useValidations} from '../../../src/validations/useValidations';
import {SimpleAppLogo} from '@svgs';
import ChooseVerificationMethod from '../createaccount/components/ChooseVerificationMethod';
import CountryPickerInput from '../createaccount/components/CountryPickerInput';
import {styles} from './styles';
import {globalStyles} from '../../../src/styles/globalStyles';

export const ForgotPassword = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const {forgotPasswordSchema} = useValidations();
  type FormData = {
    email: string | number | any;
  };
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    control: numberControl,
    handleSubmit: handleSubmitNumber,
    watch: phoneWatch,
    formState: {errors: errorsNumber},
  } = useForm();
  console.log('errors :', errors, 'isValid: ', isValid);
  const handleForm = (data: FormData) => {
    console.log('data', data);
    navigation.navigate('SignupOtpVerification', {type: 'forgot'});
  };

  const handleBackLogin = () => {
    navigation.navigate('Login');
  };
  const [selectedCategory, setSelectedCategory] = useState('Email');
  return (
    <Screen showKeyboardAware={true}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'forgotPasswordScreen.header'})}
      />
      <TopSpace top={20} />

      <View style={{alignItems: 'center'}}>
        <SimpleAppLogo width={100} height={100} />
      </View>
      <TopSpace top={20} />

      <Text style={styles.title}>
        {intl.formatMessage({id: 'forgotPasswordScreen.trouble-logging-in'})}
      </Text>
      <TopSpace top={10} />
      <Text style={styles.description}>
        {intl.formatMessage({id: 'forgotPasswordScreen.description'})}
      </Text>
      <TopSpace top={15} />

      <View style={globalStyles.simpleRow}>
        <ChooseVerificationMethod
          text={intl.formatMessage({id: 'signupScreen.phone'})}
          icon={'PhoneIcon'}
          marginLeft={0}
          selectedCategory={selectedCategory}
          handleCategory={setSelectedCategory}
        />
        <ChooseVerificationMethod
          marginLeft={20}
          text={intl.formatMessage({id: 'signupScreen.email'})}
          icon={'EmailIcon'}
          handleCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </View>

      <TopSpace top={40} />

      {selectedCategory === 'Email' && (
        <>
          <Text style={globalStyles.inputTitleStyle}>
            {intl.formatMessage({id: 'signinScreen.email-address'})}
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
        </>
      )}

      {selectedCategory === 'Phone' && (
        <>
          <CountryPickerInput control={numberControl} name="phoneNumber" />
        </>
      )}
      <TopSpace top={40} />
      <CustomButton
        borderRadius={30}
        btnWidth={'100%'}
        disabled={false}
        handleClick={
          selectedCategory === 'Email'
            ? handleSubmit(handleForm)
            : handleSubmitNumber(handleForm)
        }
        title={intl.formatMessage({id: 'buttons.submit'})}
        showRightIconButton={false}
      />

      <TouchableOpacity onPress={handleBackLogin} style={styles.backLoginBtn}>
        <Text style={styles.backLoginBtnText}>
          {intl.formatMessage({id: 'forgotPasswordScreen.back-log-in'})}
        </Text>
      </TouchableOpacity>
    </Screen>
  );
};
