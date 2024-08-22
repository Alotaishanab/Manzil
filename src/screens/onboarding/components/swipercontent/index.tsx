import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton, TopSpace} from '@components';
import {Colors} from '@colors';
import {ImageBackground} from 'react-native';
import {height} from '../../../../hooks/useDimension';
import {onboarding1} from '@assets';
import {styles} from '../../styles';

type BtnType = {
  title: string;
  description: string;
  btnText: string;
  handleClick: any;
};

const SwiperContent = ({
  title,
  description,
  btnText,
  handleClick = () => {},
}: BtnType) => {
  return (
    <View style={swiperStyles.mainWrap}>
      <View style={swiperStyles.textWrap}>
        <Text style={styles.onboardingTitle}>{title}</Text>
        <TopSpace top={10} />
        <Text style={styles.onboardingDescription}>{description}</Text>
      </View>

      <ImageBackground
        imageStyle={swiperStyles.imgStyle}
        resizeMode="cover"
        style={swiperStyles.bgImgStyle}
        source={onboarding1}>
        <CustomButton
          disabled={false}
          textColor={Colors.light.headingTitle}
          btnBg={Colors.light.background}
          handleClick={handleClick}
          title={btnText}
          showRightIconButton={false}
        />
      </ImageBackground>
    </View>
  );
};

export default SwiperContent;

const swiperStyles = StyleSheet.create({
  mainWrap: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textWrap: {
    padding: 24,
    marginBottom: 40,
  },
  imgStyle: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  bgImgStyle: {
    width: '100%',
    height: height / 1.8,
    justifyContent: 'flex-end',
  },
});
