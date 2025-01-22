// src/screens/account/login/index.tsx
import React, { useState, useContext } from 'react';
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native';
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
import { useLoginUser, useGetProfile, useGetSavedProperties } from '@services';
import AsyncHelper from '../../../src/helpers/asyncHelper';
import { styles } from './styles';
import useSessionManager from '../../../src/hooks/useSessionManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../src/context/AuthContext'; // Ensure the path is correct

export const Login = () => {
  const { intl } = useIntl();
  const navigation: any = useNavigation();
  const { loginSchema } = useValidations();

  // If you have a login mutation
  const { mutate: login } = useLoginUser();

  // Extract the session manager helper
  const { stopAndClearSession } = useSessionManager();
  const { clearGuestId,  setUserProfile } = useContext(AuthContext);


  // react-query for profile + saved props
  const { refetch: refetchProfile } = useGetProfile({ enabled: false });
  const { refetch: refetchSavedProperties } = useGetSavedProperties();

  type FormData = { email: string; password: string };
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: 'zulqarnain.fastian@gmail.com',
      password: 'Password@123',
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: FormData) => {
    login(data, {
      onSuccess: async (response) => {
        try {
          console.log('Login endpoint response is', response);

          if (!response || !response.user || !response.token) {
            console.error('Login response is incomplete:', response);
            Alert.alert('Login Failed', 'Incomplete login response from server.');
            return;
          }
          console.log('Login successful, storing tokens and user ID...');

          // 1) Kill old guest session & heartbeat
          await stopAndClearSession();

          // 2) Remove local guest session data
          await clearGuestId();
          await AsyncStorage.removeItem('guest_session');

          // 3) Store user ID + tokens
          await AsyncHelper.setUserId(response.user.id.toString());
          await AsyncHelper.setToken(response.token.access);
          await AsyncHelper.setRefreshToken(response.token.refresh);

          // confirm
          const storedUserId = await AsyncHelper.getUserId();
          const storedToken = await AsyncHelper.getToken();
          console.log('Stored user ID after login:', storedUserId);
          console.log('Stored Access Token:', storedToken);

          // 4) navigate
          navigation.navigate('BottomTabNavigator', { screen: 'Explore' });
          console.log('Navigated to Account screen.');

          // 5) refetch profile + saved
          console.log('Refetching profile...');
          const profileRes = await refetchProfile();
          console.log('Profile refetched successfully');

          // 6) store in AuthContext
          if (profileRes.data) {
            setUserProfile(profileRes.data);
              } else {
              console.warn('refetchProfile returned no data.');
             }

          console.log('Refetching saved properties...');
          await refetchSavedProperties();
          console.log('Saved properties refetched successfully');

        } catch (error) {
          console.error('Error during login handling:', error);
          Alert.alert('Login Error', 'An unexpected error occurred during login.');
        }
      },
      onError: (error) => {
        console.error('Login error:', error);
        Alert.alert('Login Failed', 'Invalid email or password.');
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
      <HeaderBackButtonTitle
        text={intl.formatMessage({ id: 'signinScreen.header' })}
      />
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

      <View style={[globalStyles.simpleRow, { marginVertical: 20 }]}>
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


