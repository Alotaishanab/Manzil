import React, { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import {
  CustomButton,
  CustomTextInput,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIntl } from '@context';
import { styles } from './styles';
import { useValidations } from '../../../src/validations/useValidations';
import { useForm } from 'react-hook-form';
import { globalStyles } from '../../../src/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { showCustomFlashMessage } from '../../../src/helpers/showCustomFlashMessage';
import { useLoginUser } from '@services';
// Importing AsyncHelper for token handling
import AsyncHelper from '../../../src/helpers/asyncHelper'; 

export const Login = () => {
  const { intl } = useIntl();
  const { mutate: login } = useLoginUser();
  const navigation: any = useNavigation();
  const { loginSchema } = useValidations();

  type FormData = {
    email: string | number | any;
    password: string | number | any;
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: 'Alotaishanab@gmail.com',
      password: 'Password@123',
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: FormData) => {
    const { email, password } = data;
    if (isValid) {
      login(
        { email, password },
        {
          onSuccess: async (response) => {
            // Save token using AsyncHelper
            await AsyncHelper.setToken(response.token.access);
            await AsyncHelper.setRefreshToken(response.token.refresh);

            // Navigate on success
            navigation.navigate('BottomTabNavigator');
            showCustomFlashMessage('Login successful');
          },
          onError: () => {
            // Handle login failure
            showCustomFlashMessage('Login failed. Please try again.');
          },
        }
      );
    }
  };

  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleGoogleLogin = () => {};
  const handleAppleLogin = () => {};
  const handleRegister = () => {
    navigation.navigate('Signup');
  };

  const handleForgot = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <Screen showKeyboardAware={true}>
      <HeaderBackButtonTitle text={intl.formatMessage({ id: 'signinScreen.header' })} />
      <TopSpace top={50} />

      <Text style={styles.inputTitleStyle}>
        {intl.formatMessage({ id: 'signinScreen.email-address' })}
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

      <TopSpace top={30} />

      <Text style={styles.inputTitleStyle}>
        {intl.formatMessage({ id: 'signinScreen.password' })}
      </Text>

      <CustomTextInput
        control={control}
        name={'password'}
        keyboardType="default"
        returnKeyType="done"
        isRequired={true}
        placeholderColor={''}
        maxLength={70}
        multiLine={false}
        secureTextEntry={hidePassword}
        showToggleEye={true}
        handleToggleEye={togglePassword}
      />

      <TopSpace top={40} />

      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleSubmit(handleLogin)}
        title={intl.formatMessage({ id: 'buttons.sign-in' })}
        showRightIconButton={true}
      />

      <TopSpace top={20} />

      <TouchableOpacity onPress={handleForgot} style={globalStyles.centeredBtn}>
        <Text style={styles.forgotPasswordText}>
          {intl.formatMessage({ id: 'buttons.forgot-password?' })}
        </Text>
      </TouchableOpacity>

      <TopSpace top={10} />

      <Text style={styles.orText}>
        {intl.formatMessage({ id: 'signinScreen.or' })}
      </Text>

      <TopSpace top={10} />

      <View
        style={[
          globalStyles.simpleRow,
          {
            marginVertical: 20,
          },
        ]}
      >
        <CustomButton
          iconName="GoogleIcon"
          showSocialButton={true}
          marginLeft={0}
          handleClick={handleGoogleLogin}
          disabled={false}
        />

        <CustomButton
          iconName="AppleIcon"
          showSocialButton={true}
          marginLeft={10}
          handleClick={handleAppleLogin}
          disabled={false}
        />
      </View>

      <TopSpace top={50} />

      <View style={[globalStyles.simpleRow, { justifyContent: 'center' }]}>
        <Text style={styles.forgotPasswordText}>
          {intl.formatMessage({ id: 'signinScreen.no-account' })}
        </Text>
        <Pressable onPress={handleRegister}>
          <Text style={styles.forgotPasswordText}>
            {intl.formatMessage({ id: 'buttons.register' })}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
};
