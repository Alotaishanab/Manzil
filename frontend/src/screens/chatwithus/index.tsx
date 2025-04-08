import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CustomButton,
  HeaderBackButtonTitle,
  Screen,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {AppMiniBotIcon, FileIcon} from '@svgs';
import {globalStyles} from '@globalStyles';

export const ChatWithUs = () => {
  const {intl} = useIntl();
  const types = [
    {
      id: 1,
      name: intl.formatMessage({id: 'chatWithUsScreen.payment'}),
    },
    {
      id: 2,
      name: intl.formatMessage({id: 'chatWithUsScreen.other'}),
    },
    {
      id: 3,
      name: intl.formatMessage({id: 'chatWithUsScreen.issue-with-ad'}),
    },
    {
      id: 4,
      name: intl.formatMessage({id: 'chatWithUsScreen.other-inquiry'}),
    },
    {
      id: 5,
      name: intl.formatMessage({id: 'chatWithUsScreen.accounts-verification'}),
    },
  ];

  const handleSend = () => {};

  return (
    <Screen showKeyboardAware={false}>
      <View style={{flex: 1}}>
        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'chatWithUsScreen.header'})}
        />

        <TopSpace top={50} />

        <View style={styles.rowMain}>
          <AppMiniBotIcon width={30} height={30} />
          <View style={styles.textWrap}>
            <Text style={styles.dearCustomerText}>
              {intl.formatMessage({id: 'chatWithUsScreen.dear-customer'})}
            </Text>

            <TopSpace top={10} />
            <Text style={styles.dearCustomerText}>
              {intl.formatMessage({id: 'chatWithUsScreen.choose-reason'})}
            </Text>
          </View>
        </View>
        <TopSpace top={10} />
        <Text style={styles.timeText}>{'4 min ago > Bot'}</Text>
        <TopSpace top={10} />
        <View style={styles.listMainWrap}>
          {types?.map(item => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item?.id}
                style={styles.btn}>
                <Text style={styles.btnText}>{item?.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <TextInput placeholder="Write here..." style={styles.fieldStyle} />
      <TopSpace top={10} />
      <View style={globalStyles.simpleRow}>
        <TouchableOpacity style={styles.attachBtn}>
          <FileIcon width={30} height={30} />
        </TouchableOpacity>
        <CustomButton
          btnWidth={'80%'}
          disabled={false}
          borderRadius={30}
          handleClick={handleSend}
          title={intl.formatMessage({id: 'buttons.send-email'})}
          showRightIconButton={false}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  rowMain: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textWrap: {
    borderRadius: 10,
    backgroundColor: Colors.light.inputBg,
    paddingHorizontal: 20,
    width: '85%',
    marginLeft: 10,
    paddingVertical: 10,
  },
  dearCustomerText: {
    color: Colors.light.grey,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  timeText: {
    width: '95%',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    textAlign: 'right',
  },
  listMainWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: Colors.light.primaryBtn,
  },
  btnText: {
    color: Colors.light.background,
    fontFamily: fonts.primary.regular,
    fontSize: 15,
  },
  contentContainer: {
    paddingBottom: 20, // Additional padding at the bottom
  },
  fieldStyle: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.grey,
    color: Colors.light.grey,
    fontFamily: fonts.primary.regular,
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
