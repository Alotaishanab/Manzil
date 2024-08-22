import React from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import {fonts} from '../../../../src/assets/fonts';
import {Colors} from '@colors';
import {useIntl} from '@context';

const AuthorizedHeader = () => {
  const {intl} = useIntl();
  return (
    <View style={styles.headerView}>
      {/* <TextInput
        placeholder="Search"
        placeholderTextColor={Colors.light.background}
        style={styles.inputStyle}
      /> */}

      <Text style={styles.textStyle}>
        {intl.formatMessage({
          id: 'savedPropertyScreen.saved',
        })}
      </Text>
    </View>
  );
};

export default AuthorizedHeader;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.light.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  inputStyle: {
    borderWidth: 1,
    paddingHorizontal: 20,
    height: 45,
    fontFamily: fonts.primary.regular,
    borderColor: Colors.light.background,
    borderRadius: 5,
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.light.headingTitle,
    fontSize: 22,
    fontFamily: fonts.tertiary.bold,
  },
});
