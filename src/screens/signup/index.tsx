/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Screen, TopSpace, CustomTextInput, CustomButton} from '@components';
import SignupHeader from './components/SignupHeader';
import {useIntl} from '@context';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import {useValidations} from '@validations';
import {useSignupUser} from '@services';
import {useNavigation} from '@react-navigation/native';
import {showCustomFlashMessage} from '../../helpers/showCustomFlashMessage';

/** Minimal type def for the form data */
type FormData = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

export const Signup = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();

  // Our signup mutation
  const {mutate: signUp} = useSignupUser();
  // Validation schema from your zod-based validations
  const {signupSchema} = useValidations();

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: {isValid},
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

  const handleSignup = async (data: FormData) => {
    if (isValid) {
      try {
        signUp(data, {
          onSuccess: () => {
            navigation.navigate('CreateAccount');
            showCustomFlashMessage('Signup successful');
          },
          onError: () => {
            showCustomFlashMessage('Signup failed. Please try again.');
          },
        });
      } catch (error) {
        console.error('Signup error:', error);
        showCustomFlashMessage('Signup failed: Please try again later!');
      }
    }
  };

  return (
    <Screen showKeyboardAware={true} style={styles.screenContainer}>
      {/* Custom "header" component with step, etc. */}
      <SignupHeader
        title={intl.formatMessage({id: 'signupScreen.sign-up'})}
        step={intl.formatMessage({id: 'requestPropertyScreen.step-1'})}
      />

      {/* A gently styled background behind the form */}
      <View style={styles.gradientBackground}>
        <View style={styles.formCard}>
          <TopSpace top={Platform.OS === 'ios' ? 15 : 10} />

          {/* Name - using floating label style */}
          <CustomTextInput
            control={control}
            name="name"
            label={intl.formatMessage({id: 'signupScreen.name'})}
            // `floatingLabel` is an imaginary prop; 
            // if your CustomTextInput doesn't support it natively,
            // handle it with a custom style or similar approach.
            floatingLabel
            keyboardType="default"
            returnKeyType="done"
            isRequired={true}
            secureTextEntry={false}
            maxLength={70}
            placeholderColor={Colors.light.greyPlaceholder}
            containerStyle={styles.inputContainer}
            underlineStyle={styles.underlineStyle}
            labelStyle={styles.floatingLabel}
            textInputStyle={styles.textInputStyle}
          />

          <TopSpace top={20} />

          {/* Email */}
          <CustomTextInput
            control={control}
            name="email"
            label={intl.formatMessage({id: 'signupScreen.email'})}
            floatingLabel
            keyboardType="email-address"
            returnKeyType="done"
            isRequired={true}
            secureTextEntry={false}
            maxLength={70}
            placeholderColor={Colors.light.greyPlaceholder}
            containerStyle={styles.inputContainer}
            underlineStyle={styles.underlineStyle}
            labelStyle={styles.floatingLabel}
            textInputStyle={styles.textInputStyle}
          />

          <TopSpace top={20} />

          {/* Password */}
          <CustomTextInput
            control={control}
            name="password"
            label={intl.formatMessage({id: 'signupScreen.password'})}
            floatingLabel
            keyboardType="default"
            returnKeyType="done"
            isRequired={true}
            secureTextEntry
            maxLength={70}
            placeholderColor={Colors.light.greyPlaceholder}
            containerStyle={styles.inputContainer}
            underlineStyle={styles.underlineStyle}
            labelStyle={styles.floatingLabel}
            textInputStyle={styles.textInputStyle}
          />

          <TopSpace top={20} />

          {/* Confirm Password */}
          <CustomTextInput
            control={control}
            name="confirmPassword"
            label={intl.formatMessage({id: 'signupScreen.confirm-password'})}
            floatingLabel
            keyboardType="default"
            returnKeyType="done"
            isRequired={true}
            secureTextEntry
            maxLength={70}
            placeholderColor={Colors.light.greyPlaceholder}
            containerStyle={styles.inputContainer}
            underlineStyle={styles.underlineStyle}
            labelStyle={styles.floatingLabel}
            textInputStyle={styles.textInputStyle}
          />

          <TopSpace top={24} />

          {/* T&C */}
          <View style={styles.termsContainer}>
            <Text style={styles.termServiceNormalText}>
              {intl.formatMessage({id: 'signupScreen.selecting-agree'})}{' '}
              <Text
                onPress={() => {
                  navigation.navigate('TermsOfUse');
                }}
                style={styles.termServiceBoldText}>
                {intl.formatMessage({id: 'signupScreen.terms-conditions'})}
              </Text>{' '}
              {intl.formatMessage({id: 'signupScreen.acknowledge'})}{' '}
              <Text
                onPress={() => {
                  navigation.navigate('PrivacyPolicy');
                }}
                style={styles.termServiceBoldText}>
                {intl.formatMessage({id: 'signupScreen.privacy-policy'})}
              </Text>
            </Text>
          </View>

          <TopSpace top={24} />

          {/* Sign up button */}
          <CustomButton
            btnWidth="100%"
            disabled={false}
            borderRadius={30}
            fontFamily={fonts.primary.regular}
            handleClick={handleSubmit(handleSignup)}
            title={intl.formatMessage({id: 'signupScreen.agree-continue'})}
            showRightIconButton={false}
          />

          <TopSpace top={20} />

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text style={styles.forgotPass}>
              {intl.formatMessage({id: 'signupScreen.forgot-password'})}
            </Text>
          </TouchableOpacity>

          <TopSpace top={10} />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.light.background, // keep your theme color
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  formCard: {
    backgroundColor: Colors.light.cardBackground || '#fff',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 10,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  inputContainer: {
    marginVertical: 5,
  },
  underlineStyle: {
    height: 1.5,
    backgroundColor: Colors.light.headingTitle + '50', // 50% alpha
  },
  floatingLabel: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    color: Colors.light.headingTitle,
    marginBottom: 2,
  },
  textInputStyle: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: Colors.light.headingTitleDark || '#333',
  },
  termsContainer: {
    marginHorizontal: 2,
  },
  termServiceNormalText: {
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyHeading,
    fontSize: 13,
    lineHeight: 18,
  },
  termServiceBoldText: {
    fontFamily: fonts.primary.medium,
    color: '#5389fe',
    fontSize: 13,
  },
  forgotPass: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    textDecorationLine: 'underline',
  },
});

export default Signup;
