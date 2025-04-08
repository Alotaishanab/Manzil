import React from 'react';
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
import {styles} from './styles';
import {useIntl} from '@context';
import {useValidations} from '../../validations/useValidations';

export const OtpVerification = () => {
  const {intl} = useIntl();
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
    console.log('data::', data);
    navigation.navigate('ResetPassword');
  };
  return (
    <Screen showKeyboardAware={false}>
      <View>
        {/*  */}
        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'otpVerificationScreen.header'})}
        />
        <TopSpace top={20} />
        <Text style={styles.descriptionText}>
          {intl.formatMessage({id: 'otpVerificationScreen.description'})}.{' '}
        </Text>

        <CodeInputField
          keyboardType={'number-pad'}
          control={control}
          cellCount={6}
          isRequired={true}
          name="code"
          // theme={theme}
        />

        <TopSpace top={20} />
        <CustomButton
          btnWidth={'100%'}
          disabled={false}
          borderRadius={30}
          handleClick={handleSubmit(onSubmit)}
          title={intl.formatMessage({id: 'buttons.verify-otp'})}
          showRightIconButton={false}
        />
      </View>
    </Screen>
  );
};
