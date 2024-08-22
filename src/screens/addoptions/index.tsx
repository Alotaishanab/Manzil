import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Screen, TopSpace} from '@components';
import {Colors} from '@colors';
import {useIntl} from '@context';
import {fonts} from '@fonts';
import {useNavigation} from '@react-navigation/native';
import {GraphUpDownIcon, PlusIcon, SearchFillIcon} from '@svgs';
import {globalStyles} from '@globalStyles';

export const AddOptions = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const handleAdd = () => {
    navigation.navigate('AddProperties');
  };
  const handlePromoteProperty = () => {
    navigation.navigate('PromoteProperty');
  };
  const handleRequest = () => {
    navigation.navigate('RequestProperty');
  };
  return (
    <Screen padding={0} showKeyboardAware={false}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={styles.roundedWrap}>
          <View style={styles.line} />
          <TopSpace top={20} />
          <Text style={styles.title}>
            {intl.formatMessage({
              id: 'addPropertiesModal.header',
            })}
          </Text>

          <TopSpace top={20} />

          <TouchableOpacity
            onPress={handleAdd}
            activeOpacity={0.8}
            style={globalStyles.simpleRow}>
            <View style={styles.smallCircle}>
              <PlusIcon width={13} height={13} fill={Colors.light.primaryBtn} />
            </View>

            <Text style={styles.iconTitle}>
              {intl.formatMessage({
                id: 'addPropertiesModal.add',
              })}
            </Text>
          </TouchableOpacity>

          <TopSpace top={20} />

          <TouchableOpacity
            onPress={handlePromoteProperty}
            activeOpacity={0.8}
            style={globalStyles.simpleRow}>
            <GraphUpDownIcon width={20} height={20} />

            <Text style={styles.iconTitle}>
              {intl.formatMessage({
                id: 'addPropertiesModal.promote',
              })}
              {/* I want to promote  */}
            </Text>
          </TouchableOpacity>
          <TopSpace top={20} />
          <TouchableOpacity
            onPress={handleRequest}
            activeOpacity={0.8}
            style={globalStyles.simpleRow}>
            <SearchFillIcon width={20} height={20} />

            <Text style={styles.iconTitle}>
              {/* I want to request */}
              {intl.formatMessage({
                id: 'addPropertiesModal.request',
              })}
            </Text>
          </TouchableOpacity>
          <TopSpace top={20} />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  roundedWrap: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.light.inputBg,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  line: {
    width: 30,
    alignSelf: 'center',
    height: 3,
    borderRadius: 10,

    backgroundColor: Colors.light.grey,
  },
  title: {
    textAlign: 'center',
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 16,
  },
  smallCircle: {
    width: 18,
    height: 18,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.light.primaryBtn,
  },
  iconTitle: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    marginLeft: 10,
    color: Colors.light.primaryBtn,
  },
});
