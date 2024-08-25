/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {CustomButton, TopSpace} from '@components';
import {useIntl} from '@context';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {onboarding1, onboarding2} from '@assets';
import {fonts} from '@fonts';
import {height} from '@useDimension';

export const Onboarding = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const [current, setCurrent] = useState<any>(1);

  const handleSkip = () => {
    navigation.navigate('Welcome');
  };

  const handleNext = () => {
    if (current === 1) {
      setCurrent(2);
    } else {
      navigation.navigate('Welcome');
    }
  };
  return (
    <ImageBackground
      resizeMode="cover"
      source={current === 1 ? onboarding1 : onboarding2}
      style={{
        flexGrow: 1,
      }}>
      <StatusBar barStyle="light-content" />
      <TopSpace top={Platform.OS === 'ios' ? 20 : 0} />
      <Pressable onPress={handleSkip} style={styles.skipBtn}>
        <Text style={styles.skipBtnText}>
          {intl.formatMessage({id: 'buttons.skip'})}
        </Text>
      </Pressable>

      <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
        <View style={styles.bottomWrap}>
          <TopSpace top={50} />
          <Text style={styles.onboardingTitle}>
            {current === 1
              ? intl.formatMessage({id: 'onboardingScreen.list1-title'})
              : intl.formatMessage({id: 'onboardingScreen.list2-title'})}
          </Text>
          <TopSpace top={10} />
          <Text style={styles.onboardingDescription}>
            {current === 1
              ? intl.formatMessage({id: 'onboardingScreen.list1-description'})
              : intl.formatMessage({id: 'onboardingScreen.list2-description'})}
          </Text>

          <TopSpace top={40} />

          <CustomButton
            disabled={false}
            borderRadius={30}
            fontFamily={fonts.primary.regular}
            handleClick={handleNext}
            title={intl.formatMessage({id: 'buttons.next'})}
            showRightIconButton={true}
          />
          <TopSpace top={40} />
        </View>
      </View>
    </ImageBackground>
  );
};
