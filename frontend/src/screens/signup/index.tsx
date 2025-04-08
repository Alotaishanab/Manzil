import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Screen,
  TopSpace,
  CustomTextInput,
  CustomButton,
  HeaderBackButtonTitle,
} from '@components';

import { useIntl } from '@context';
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { useValidations } from '@validations';
import { useSignupUser } from '@services';
import { useNavigation } from '@react-navigation/native';
import { showCustomFlashMessage } from '../../helpers/showCustomFlashMessage';

type FormData = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

export const Signup = () => {
  const { intl } = useIntl();
  const navigation: any = useNavigation();
  const { mutate: signUp } = useSignupUser();
  const { signupSchema } = useValidations();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = (data: FormData) => {
    if (isValid) {
      signUp(data, {
        onSuccess: () => {
          navigation.navigate('CreateAccount');
          showCustomFlashMessage('Signup successful');
        },
        onError: () => {
          showCustomFlashMessage('Signup failed. Please try again.');
        },
      });
    }
  };

  return (
    <Screen backgroundColor="#F9F9F9" showKeyboardAware>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <View style={styles.header}>
          <HeaderBackButtonTitle text="" onPress={() => navigation.goBack()} />
        </View>

        {/* Screen Title */}
        <Text style={styles.title}>
          {intl.formatMessage({ id: 'signupScreen.sign-up' }) || 'Sign up'}
        </Text>

        <TopSpace top={30} />

        <CustomTextInput
          control={control}
          name="name"
          label={intl.formatMessage({ id: 'signupScreen.name' })}
          keyboardType="default"
          returnKeyType="done"
          isRequired
        />

        <TopSpace top={20} />

        <CustomTextInput
          control={control}
          name="email"
          label={intl.formatMessage({ id: 'signupScreen.email' })}
          keyboardType="email-address"
          returnKeyType="done"
          isRequired
        />

        <TopSpace top={20} />

        <CustomTextInput
          control={control}
          name="password"
          label={intl.formatMessage({ id: 'signupScreen.password' })}
          secureTextEntry
          keyboardType="default"
          returnKeyType="done"
          isRequired
        />

        <TopSpace top={20} />

        <CustomTextInput
          control={control}
          name="confirmPassword"
          label={intl.formatMessage({ id: 'signupScreen.confirm-password' })}
          secureTextEntry
          keyboardType="default"
          returnKeyType="done"
          isRequired
        />

        <TopSpace top={30} />

        {/* Terms & Conditions */}
        <Text style={styles.termsText}>
          {intl.formatMessage({ id: 'signupScreen.selecting-agree' })}{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('TermsOfUse')}
          >
            {intl.formatMessage({ id: 'signupScreen.terms-conditions' })}
          </Text>{' '}
          {intl.formatMessage({ id: 'signupScreen.acknowledge' })}{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            {intl.formatMessage({ id: 'signupScreen.privacy-policy' })}
          </Text>
        </Text>

        <TopSpace top={30} />

        <CustomButton
          btnWidth="100%"
          disabled={false}
          borderRadius={30}
          fontFamily={fonts.primary.regular}
          handleClick={handleSubmit(handleSignup)}
          title={intl.formatMessage({ id: 'signupScreen.agree-continue' })}
          showRightIconButton
          backgroundColor={Colors.primary}
          textColor="#fff"
          iconBackground="#fff"
          iconColor={Colors.primary}
        />

        <TopSpace top={25} />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>
            {intl.formatMessage({ id: 'signupScreen.forgot-password' })}
          </Text>
        </TouchableOpacity>

        <TopSpace top={40} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    textAlign: 'left',
  },
  termsText: {
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyHeading,
    fontSize: 13,
    lineHeight: 18,
  },
  linkText: {
    fontFamily: fonts.primary.medium,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  forgotText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Signup;
