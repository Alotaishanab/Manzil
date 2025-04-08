/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderBackButtonTitle, TopSpace} from '@components';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import PromoteCard from './components/PromoteCard';
import {useNavigation} from '@react-navigation/native';

export const PromoteProperty = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const handleCard = () => {
    navigation.navigate('Checkout');
  };

  const renderPromoteList = ({item}) => {
    return <PromoteCard handleClick={handleCard} />;
  };
  return (
    <SafeAreaView style={[globalStyles.wrapScreen, {}]}>
      <View
        style={{
          flexGrow: 1,
          paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <HeaderBackButtonTitle
          text={intl.formatMessage({id: 'promoteScreen.header'})}
        />
        <TopSpace top={20} />

        <Text style={styles.description}>
          {intl.formatMessage({id: 'promoteScreen.description'})}
        </Text>

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.toString()}
          renderItem={renderPromoteList}
          ListFooterComponentStyle={{
            marginBottom: 40,
          }}
          ListFooterComponent={<View style={{marginBottom: 50}} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  description: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
  },
});
