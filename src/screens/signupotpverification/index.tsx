import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  CodeInputField,
  CustomButton,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {useValidations} from '../../validations/useValidations';
import {styles} from './styles';
import SignupHeader from '../signup/components/SignupHeader';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import {useVerifyUserPhone} from "@services"

export const SignupOtpVerification = () => {
  const {intl} = useIntl();
  const route: any = useRoute();
  const type = route?.params?.type;
  const { mutate: verifyPhone } = useVerifyUserPhone();
  console.log('typ:', type);
  const navigation: any = useNavigation();
  const {otpValidationSchema} = useValidations();
  type FormData = {
    code: '';
  };

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<FormData>({
    defaultValues: {
      code: '',
    },
    mode: 'onChange',
    resolver: zodResolver(otpValidationSchema),
  });
  const onSubmit = async (data: FormData) => {
    if (!isValid) {
      Alert.alert('Please enter code');
      return;
    }

    console.log('data', data)
    verifyPhone({ verification_code: data.code}, {
      onSuccess: () => {
        if (type === 'forgot') {
          navigation.navigate('ResetPassword', {type: type});
        } else {
          navigation.navigate('Login');
        }
        
      },
      onError: () => {
        console.error("Error in verify phone api")
      }
    });
    

   
  };

  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer); // Clear timeout if the component is unmounted
    }
  }, [seconds]);

  return (
    <Screen showKeyboardAware={false}>
      <View>
        {/*  */}

        <SignupHeader
          showSteps={type === 'forgot' ? false : true}
          title={intl.formatMessage({id: 'signupScreen.verification-code'})}
          step={intl.formatMessage({id: 'requestPropertyScreen.step-3'})}
        />
        <TopSpace top={20} />
        <Text style={styles.descriptionText}>
          {intl.formatMessage({id: 'signupScreen.otp-sent'})}.{' '}
        </Text>
        <TopSpace top={20} />

        <CodeInputField
          keyboardType={'number-pad'}
          control={control}
          cellCount={6}
          isRequired={true}
          name="code"
          // theme={theme}
        />
        <Text style={styles.timerText}>{seconds}</Text>

        <TopSpace top={20} />
        <CustomButton
          btnWidth={'100%'}
          disabled={false}
          borderRadius={30}
          handleClick={handleSubmit(onSubmit)}
          title={
            seconds > 0
              ? 'Continue'
              : intl.formatMessage({id: 'buttons.resend-code'})
          }
          showRightIconButton={true}
        />
      </View>
    </Screen>
  );
};
