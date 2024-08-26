/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {fonts} from '../../../../src/assets/fonts';
import {Colors} from '@colors';
import AuthorizedHeader from './AuthorizedHeader';
import {DropDownPicker, PropertyCard, TabButtons, TopSpace} from '@components';
// import {useIntl} from '@context';
import {useIntl} from '@context';
import SavedCardSkeleton from './SavedCardSkeleton';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '@globalStyles';

const AuthorizedContent = ({sortList}) => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [btnSelected, setBtnSelected] = useState(
    intl.formatMessage({
      id: 'buttons.for-sale',
    }),
  );

  const [value, setValue] = useState<any>('');
  const [isFocus, setIsFocus] = useState(false);

  const handleCard = () => {
    navigation.navigate('PropertyScreen');
  };
  const renderProperty = ({item}: any) => {
    return (
      <PropertyCard
        sliderWidth={'90%'}
        marginBottom={8}
        item={item}
        handleClick={handleCard}
      />
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <AuthorizedHeader />
      <View
        style={[
          styles.innerWrap,
          {
            paddingTop: 5,
            overflow: 'hidden',
          },
        ]}>
        <TabButtons
          options={[
            intl.formatMessage({
              id: 'buttons.for-sale',
            }),
            intl.formatMessage({
              id: 'buttons.to-rent',
            }),
          ]}
          onSelect={setBtnSelected}
          borderRadius={10}
          paddingVertical={10}
          selectedOption={btnSelected}
        />
        <TopSpace top={10} />
        <View
          style={[
            globalStyles.simpleRow,
            {
              alignSelf: 'flex-end',
            },
          ]}>
          {/* <Text style={styles.sortedText}>
            {intl.formatMessage({id: 'savedPropertyScreen.sort'})}
          </Text> */}
          <DropDownPicker
            // placeholder="Select"
            value={value}
            data={sortList}
            isFocus={isFocus}
            dropdownBgColor={Colors.light.secondaryBackground}
            setValue={setValue}
            dropdownWidth={'60%'}
            setIsFocus={setIsFocus}
            containerWidth={'55%'}
            labelField="label"
            valueField="value"
            focusBgColor={Colors.light.secondaryBackground}
            onChange={value => {
              setValue(value);
              //   console.log("pharmacy on change", value);
            }}
          />
        </View>

        <TopSpace top={10} />

        {isLoading ? (
          <>
            <SavedCardSkeleton />
            <SavedCardSkeleton />
          </>
        ) : (
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7]}
            contentContainerStyle={styles.flatListContentContainerStyle}
            ListFooterComponent={<View style={styles.footer} />}
            renderItem={renderProperty}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default AuthorizedContent;

const styles = StyleSheet.create({
  innerWrap: {
    margin: 7,
    padding: 10,
  },
  sortedText: {
    textAlign: 'right',
    marginVertical: 10,
    fontSize: 18,
    marginRight: 5,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  imgStyle: {
    borderRadius: 10,
    height: 270,
    alignItems: 'flex-end',
    padding: 5,
  },
  dateText: {
    textAlign: 'right',
    fontSize: 11,
    right: 15,
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
  },
  footer: {
    height: 10,
  },
  flatListContentContainerStyle: {
    width: '100%',
    // paddingHorizontal: 2,
    paddingHorizontal: 3,
    overflow: 'hidden',
  },
});
