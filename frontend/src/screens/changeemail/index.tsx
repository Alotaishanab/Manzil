import React, {useState} from 'react';
import {
  CustomButton,
  CustomTextInput,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {Text, View} from 'react-native';
import {useIntl} from '@context';
import {styles} from './styles';
import {useValidations} from '../../validations/useValidations';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';

export const ChangeEmail = () => {
  const {intl} = useIntl();
  const {changeEmailSchema} = useValidations();
  const navigation: any = useNavigation();
  type FormData = {
    email: string | number | any;
    password: string | number | any;
  };
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(changeEmailSchema),
  });
  const [hidePassword, setHidePassword] = useState(true);
  const handleTogglePassword = () => {
    setHidePassword(!hidePassword);
  };
  const onSubmit = (data: FormData) => {
    console.log('data:', data);
    navigation.navigate('ChangePasswordOtpVerification');
  };
  return (
    <Screen showKeyboardAware={true}>
      <View style={{flex: 1}}>
        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'changemailScreen.header'})}
        />
        <TopSpace top={20} />
        <Text style={styles.descriptionText}>
          {intl.formatMessage({id: 'changemailScreen.description'})}
        </Text>
        <TopSpace top={30} />
        <Text style={styles.fieldTitle}>
          {intl.formatMessage({id: 'changemailScreen.current-email'})}
        </Text>
        <Text style={styles.emailText}>faisal@gmail.com</Text>
        <TopSpace top={30} />
        <Text style={styles.fieldTitleText}>
          {intl.formatMessage({id: 'changemailScreen.new-email'})}
        </Text>

        <CustomTextInput
          control={control}
          name={'email'}
          keyboardType="email-address"
          returnKeyType="done"
          isRequired={true}
          secureTextEntry={true}
          placeholderColor={''}
          maxLength={70}
          showToggleEye={false}
          multiLine={false}
        />

        {/*  */}
        <TopSpace top={30} />
        <Text style={styles.fieldTitleText}>
          {intl.formatMessage({id: 'changemailScreen.confirm-password'})}
        </Text>
        <CustomTextInput
          control={control}
          name={'password'}
          keyboardType="default"
          returnKeyType="done"
          isRequired={true}
          secureTextEntry={hidePassword}
          placeholderColor={''}
          maxLength={70}
          showToggleEye={true}
          multiLine={false}
          handleToggleEye={handleTogglePassword}
        />
      </View>
      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleSubmit(onSubmit)}
        title={intl.formatMessage({id: 'buttons.save'})}
        showRightIconButton={false}
      />
    </Screen>
  );
};
