import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Animated,
  Alert,
  I18nManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CustomTextInput,
  CustomButton,
  TopSpace,
  HeaderBackButtonTitle,
  Screen,
} from '@components';

import { useIntl } from '@context';
import { useValidations } from '@validations';
import {
  useLoginUser,
  useGetProfile,
  useGetSavedProperties,
} from '@services';
import { AsyncHelper } from '@helpers';
import useSessionManager from '../../hooks/useSessionManager';
import { AuthContext } from '@context';
import { Colors } from '@colors';
import { fonts } from '@fonts';

export const Login = () => {
  const { intl } = useIntl();
  const navigation: any = useNavigation();
  const { loginSchema } = useValidations();
  const { mutate: login } = useLoginUser();
  const { stopAndClearSession } = useSessionManager();
  const { clearGuestId, setUserProfile } = useContext(AuthContext);
  const { refetch: refetchProfile } = useGetProfile({ enabled: false });
  const { refetch: refetchSavedProperties } = useGetSavedProperties();

  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.97)).current;

  const { control, handleSubmit } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = (data: { email: string; password: string }) => {
    login(data, {
      onSuccess: async (response) => {
        if (!response?.user || !response?.token) {
          Alert.alert('Login Failed', 'Incomplete login response.');
          return;
        }

        await stopAndClearSession();
        await clearGuestId();
        await AsyncStorage.removeItem('guest_session');
        await AsyncHelper.setUserId(response.user.id.toString());
        await AsyncHelper.setToken(response.token.access);
        await AsyncHelper.setRefreshToken(response.token.refresh);

        const profileRes = await refetchProfile();
        if (profileRes.data) setUserProfile(profileRes.data);
        await refetchSavedProperties();

        navigation.navigate('BottomTabNavigator', { screen: 'Explore' });
      },
      onError: () => {
        Alert.alert('Login Failed', 'Invalid email or password.');
      },
    });
  };

  return (
    <Screen backgroundColor="#F9F9F9" showKeyboardAware>
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {/* Back Button (HeaderBackButtonTitle) */}
        <View style={styles.headerRow}>
          <HeaderBackButtonTitle
            text=""
            onPress={() => navigation.goBack()}
            style={styles.backBtnBox}
            iconStyle={styles.backArrow}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {intl.formatMessage({ id: 'signinScreen.header' }) || 'Sign in'}
        </Text>

        <TopSpace top={40} />

        {/* Email Field */}
        <CustomTextInput
          control={control}
          name="email"
          label="Email address"
          placeholder="Email address"
          keyboardType="email-address"
          returnKeyType="done"
          isRequired
        />

        <TopSpace top={20} />

        {/* Password Field */}
        <CustomTextInput
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
          keyboardType="default"
          returnKeyType="done"
          secureTextEntry={hidePassword}
          showToggleEye
          handleToggleEye={() => setHidePassword(!hidePassword)}
          isRequired
        />

        <TopSpace top={30} />

        {/* Sign in */}
        <CustomButton
          btnWidth="100%"
          borderRadius={50}
          handleClick={handleSubmit(handleLogin)}
          title="Sign in"
          showRightIconButton
          backgroundColor={Colors.primary}
          textColor="#fff"
          iconBackground="#fff"
          iconColor={Colors.primary}
        />

        <TopSpace top={20} />

        {/* Nafath login */}
        <CustomButton
          btnWidth="100%"
          borderRadius={50}
          slim
          handleClick={() => Alert.alert('Nafath Login')}
          title="Login with Nafath"
          backgroundColor="#fff"
          borderColor={Colors.primary}
          borderWidth={1.5}
          textColor={Colors.primary}
          iconName="ShieldCheckIcon" // assuming icon support
        />

        <TopSpace top={30} />

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TopSpace top={40} />

        {/* Register */}
        <View style={styles.registerRow}>
          <Text style={styles.noAccountText}>No account?</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.registerLink}> Register</Text>
          </Pressable>
        </View>
      </Animated.ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerRow: {
    marginTop: 10,
  },
  backBtnBox: {
    backgroundColor: '#EDEDED',
    borderRadius: 12,
    padding: 6,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: Colors.light.headingTitle,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    marginTop: 15,
    marginBottom: 0,
  },
  forgotPassword: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.primary,
    fontFamily: fonts.primary.medium,
    textDecorationLine: 'underline',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  noAccountText: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: '#888',
  },
  registerLink: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Login;
