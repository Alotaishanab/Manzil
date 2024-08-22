import React from 'react';
import {
  CustomButton,
  CustomTextInput,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {useValidations} from '../../../src/validations/useValidations';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../src/assets/fonts';
import {Colors} from '@colors';
import {globalStyles} from '../../../src/styles/globalStyles';
import {Close, CloseIcon, FileIcon} from '@svgs';
import {ag1} from '@assets';

export const SendFeedback = () => {
  const {intl} = useIntl();
  const {sendFeedbackSchema} = useValidations();

  type FeedbackFormData = {
    email: string | number | any;
    description: string | number | any;
  };

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<FeedbackFormData>({
    defaultValues: {
      email: '',
      description: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(sendFeedbackSchema),
  });

  const handleSendEmail = (data: FeedbackFormData) => {
    console.log('data:', data);
  };
  return (
    <Screen showKeyboardAware={true}>
      <View style={styles.innerWrap}>
        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'sendFeedbackScreen.header'})}
        />
        <TopSpace top={20} />

        <Text style={styles.inputFieldTitle}>
          {intl.formatMessage({id: 'sendFeedbackScreen.email-address'})}
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
        <TopSpace top={20} />

        <Text style={styles.inputFieldTitle}>
          {intl.formatMessage({id: 'sendFeedbackScreen.description'})}
        </Text>

        <View style={{}}>
          <CustomTextInput
            control={control}
            name={'description'}
            keyboardType="default"
            returnKeyType="done"
            isRequired={true}
            secureTextEntry={false}
            placeholderColor={''}
            maxLength={500}
            showToggleEye={false}
            multiLine={true}
            numberOfLines={15}
            textAlignVertical="top"
            height={350}
          />
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              position: 'absolute',
              right: 20,
              flexDirection: 'row',
              bottom: 10,
            }}>
            <Image
              source={ag1}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                backgroundColor: Colors.light.background,
              }}
            />
            <View
              style={{
                right: 10,
                borderRadius: 10,
                backgroundColor: Colors.light.headingTitle,
              }}>
              <CloseIcon
                fill={Colors.light.background}
                color={Colors.light.headingTitle}
                width={20}
                height={20}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={globalStyles.simpleRow}>
        <TouchableOpacity style={styles.attachBtn}>
          <FileIcon width={30} height={30} />
        </TouchableOpacity>
        <CustomButton
          btnWidth={'80%'}
          disabled={false}
          borderRadius={30}
          handleClick={handleSubmit(handleSendEmail)}
          title={intl.formatMessage({id: 'buttons.send-email'})}
          showRightIconButton={false}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  innerWrap: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
  },
  inputFieldTitle: {
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
    color: Colors.light.headingTitle,
  },
  attachBtn: {
    backgroundColor: Colors.light.secondaryBackground,
    height: 52,
    width: 60,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
