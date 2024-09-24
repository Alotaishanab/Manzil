/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  CustomButton,
  CustomTextInput,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useValidations} from '../../../src/validations/useValidations';
import {useIntl} from '@context';
import {styles} from './styles';
import {useResetUserPassword} from '@services';

type FormData = {
  password: string;
  confirmPassword: string;
};

export const ResetPassword = () => {
  const {resetPasswordSchema} = useValidations();
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const {mutate: resetPassword} = useResetUserPassword();

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
  });
  console.log('isValid', isValid);
  const onSubmit = (data: FormData) => {
    console.log('data', data);

    navigation.navigate('Login');
    // resetPassword(data, {
    //   onSuccess: () => {
    //     // Navigate on success
    //     showCustomFlashMessage('Reset password successful');
    //     navigation.navigate('Login');
    //   },
    //   onError: () => {
    //     // Handle login failure
    //     showCustomFlashMessage('Reset password failed. Please try again.');
    //   }
    // });
  };
  return (
    <Screen showKeyboardAware={true}>
      <View>
        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'resetPasswordScreen.header'})}
        />

        <TopSpace top={20} />
        <Text style={styles.descriptionText}>
          {intl.formatMessage({id: 'resetPasswordScreen.description'})}
        </Text>
        <TopSpace top={30} />
        <Text style={styles.titleText}>
          {intl.formatMessage({id: 'resetPasswordScreen.password'})}
        </Text>
        <CustomTextInput
          control={control}
          name={'password'}
          keyboardType="default"
          returnKeyType="done"
          isRequired={true}
          secureTextEntry={true}
          placeholderColor={''}
          maxLength={70}
          showToggleEye={false}
          multiLine={false}
        />
        <TopSpace top={30} />

        <Text style={styles.titleText}>
          {intl.formatMessage({id: 'resetPasswordScreen.confirm-password'})}
        </Text>
        <CustomTextInput
          control={control}
          name={'confirmPassword'}
          keyboardType="default"
          returnKeyType="done"
          isRequired={true}
          secureTextEntry={true}
          placeholderColor={''}
          maxLength={70}
          showToggleEye={false}
          multiLine={false}
        />

        <TopSpace top={40} />
        <CustomButton
          btnWidth={'100%'}
          disabled={false}
          borderRadius={30}
          handleClick={handleSubmit(onSubmit)}
          title={intl.formatMessage({id: 'buttons.reset-password'})}
          showRightIconButton={false}
        />
      </View>
    </Screen>
  );
};
