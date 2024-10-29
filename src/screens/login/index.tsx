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
import { useValidations } from '../../../src/validations/useValidations';
import { useForm } from 'react-hook-form';
import { globalStyles } from '../../../src/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { showCustomFlashMessage } from '../../../src/helpers/showCustomFlashMessage';
import { useLoginUser, useGetProfile, useGetSavedProperties } from '@services'; // Added useGetSavedProperties
import AsyncHelper from '../../../src/helpers/asyncHelper';
import { styles } from './styles';
import useSessionTracker from '../../hooks/useSessionTracker';


export const Login = () => {
  const { intl } = useIntl();
  const { mutate: login } = useLoginUser();
  const navigation: any = useNavigation();
  const { loginSchema } = useValidations();
  const { startSessionHandler } = useSessionTracker();

  // Using react-query to get the profile and saved properties after login
  const { refetch: refetchProfile } = useGetProfile();
  const { refetch: refetchSavedProperties } = useGetSavedProperties(); // Add refetch for saved properties

  type FormData = {
    email: string;
    password: string;
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

  const handleLogin = (data: LoginCredentials) => {
    const { mutate: login } = useLoginUser();
  
    login(data, {
      onSuccess: async (response) => {
        try {
          console.log("Login successful, storing tokens and user ID...");
  
          // End the guest session and remove guest-specific data
          await AsyncHelper.removeGuestId();
          
          // Save user-specific session data
          await AsyncHelper.setUserId(response.user.id);
          await AsyncHelper.setToken(response.token.access);
          await AsyncHelper.setRefreshToken(response.token.refresh);
  
          console.log("Starting new session for logged-in user...");
          
          // Start a new user session
          const newSession = await startSessionHandler();
  
          if (newSession) {
            console.log("Session started with ID:", newSession.session_id);
            navigation.navigate("BottomTabNavigator");
          } else {
            console.error("Session start failed.");
          }
  
        } catch (error) {
          console.error("Error during login handling:", error);
        }
      },
      onError: (error) => {
        console.error("Login error:", error);
      },
    });
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
