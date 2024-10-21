import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { useIntl } from '@context';
import { fonts } from '../../../assets/fonts/index';

const TitleValueRow = ({ title, value, onPress }) => (
  <TouchableOpacity style={styles.rowContainer} activeOpacity={0.7} onPress={onPress}>
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.valueText}>{value}</Text>
  </TouchableOpacity>
);

const TitleArrowIconWrap = ({ headingTitle, textStyle, isExpanded, onPress }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Rotate arrow icon based on isExpanded state
  Animated.timing(rotateAnim, {
    toValue: isExpanded ? 1 : 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.titleContainer} activeOpacity={0.8}>
      <Text style={[styles.headingText, textStyle]}>{headingTitle}</Text>
      <Animated.Image
        source={require('../../../assets/images/authorityIcon.png')}
        style={[styles.headingIcon, { transform: [{ rotate: rotateInterpolate }] }]}
      />
    </TouchableOpacity>
  );
};

const AdInfo = () => {
  const intl = useIntl();
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 250, // Adjust height based on content
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, { maxWidth: '97%' }]}>
        <TitleArrowIconWrap
          headingTitle="Real Estate Authority Info"
          textStyle={styles.headingText}
          isExpanded={isExpanded}
          onPress={toggleExpand}
        />

        <Animated.View style={[styles.collapsibleContent, { height: animatedHeight }]}>
          <View style={styles.divider} />
          <TitleValueRow title="Advertising License Number" value="321" onPress={() => { /* Handle Press */ }} />
          <TitleValueRow title="Unified Number Establishment" value="25" onPress={() => { /* Handle Press */ }} />
          <TitleValueRow title="FAL License No" value="7" onPress={() => { /* Handle Press */ }} />
          <TitleValueRow title="Date Registration" value="2024/06/29" onPress={() => { /* Handle Press */ }} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginVertical: 10,
    overflow: 'hidden',
  },
  headingText: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  headingIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 8,
    width: '95%',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.primary.regular,
    flex: 1,
  },
  valueText: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.primary.bold,
    textAlign: 'right',
  },
  collapsibleContent: {
    overflow: 'hidden',
  },
});

export default AdInfo;
