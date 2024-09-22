import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
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

type FormData = {
  code: '';
};

export const ChangePasswordOtpVerification = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const {otpValidationSchema} = useValidations();

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
    console.log('data:', data);
    if (!isValid) {
      Alert.alert('Please enter code');
      return;
    }

    navigation.navigate('Explore');
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

        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'signupScreen.verification-code'})}
        />
        <TopSpace top={20} />
        <Text style={styles.descriptionText}>
          {intl.formatMessage({id: 'signupScreen.otp-sent-email'})}.{' '}
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
