import React from 'react';
import {
  CustomButton,
  CustomTextInput,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {Text, View} from 'react-native';
import {useIntl} from '@context';
import {useChangePasswordProps} from './useChangePasswordProps';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useValidations} from '../../validations/useValidations';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useChangeUserPassword} from '@services';
import {showCustomFlashMessage} from '../../helpers/showCustomFlashMessage';

type FormData = {
  currentPassword: string | number | any;
  password: string | number | any;
  confirmPassword: string | number | any;
};

export const ChangePassword = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const {changePasswordSchema} = useValidations();
  const {mutate: changeUserPassword} = useChangeUserPassword();
  const route: any = useRoute();
  const type = route?.params?.type;
  const {
    toggleHideCurrentPass,
    toggleHideConfirmPass,
    toggleHideNewPass,
    hideCurrentPass,
    hideNewPass,
    hideConfirmPass,
  } = useChangePasswordProps();

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<FormData>({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(changePasswordSchema),
  });
  const onSubmit = (data: FormData) => {
    console.log('data', data);

    changeUserPassword(data, {
      onSuccess: () => {
        // Navigate on success
        showCustomFlashMessage('Password changed successfully');
        if (type === 'forgot') {
          navigation.navigate('Login');
        } else {
          navigation.navigate('Account');
        }
      },
      onError: () => {
        // Handle login failure
        showCustomFlashMessage('Failed to change password. Please try again.');
      },
    });
  };
  console.log('isValid', isValid);
  return (
    <Screen showKeyboardAware={true}>
      <View style={{flex: 1}}>
        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'changePasswordScreen.header'})}
        />
        <TopSpace top={20} />

        <Text style={styles.fieldTitleText}>
          {intl.formatMessage({id: 'changePasswordScreen.current-password'})}
        </Text>
        <CustomTextInput
          control={control}
          name={'currentPassword'}
          keyboardType="default"
          returnKeyType="done"
          isRequired={true}
          secureTextEntry={hideCurrentPass}
          placeholderColor={''}
          maxLength={70}
          showToggleEye={true}
          multiLine={false}
          handleToggleEye={toggleHideCurrentPass}
        />
        <TopSpace top={20} />

        <Text style={styles.fieldTitleText}>
          {intl.formatMessage({id: 'changePasswordScreen.new-password'})}
        </Text>
        <CustomTextInput
          control={control}
          name={'password'}
          keyboardType="default"
          returnKeyType="done"
          isRequired={true}
          secureTextEntry={hideNewPass}
          placeholderColor={''}
          maxLength={70}
          showToggleEye={true}
          multiLine={false}
          handleToggleEye={toggleHideNewPass}
        />
        <TopSpace top={20} />

        <Text style={styles.fieldTitleText}>
          {intl.formatMessage({
            id: 'changePasswordScreen.confirm-new-password',
          })}
        </Text>
        <CustomTextInput
          control={control}
          name={'confirmPassword'}
          keyboardType="default"
          returnKeyType="done"
          isRequired={true}
          placeholderColor={''}
          maxLength={70}
          multiLine={false}
          secureTextEntry={hideConfirmPass}
          showToggleEye={true}
          handleToggleEye={toggleHideConfirmPass}
        />
      </View>
      {/*  */}

      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleSubmit(onSubmit)}
        title={intl.formatMessage({id: 'changePasswordScreen.change-password'})}
        showRightIconButton={false}
      />
    </Screen>
  );
};
