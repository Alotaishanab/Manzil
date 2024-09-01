/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Account,
  AddOptions,
  AllAgencies,
  Explore,
  ExploreMaps,
  Home,
  Land,
  Saved,
  SavedProperties,
} from '@screens';
import { Colors } from '@colors';
import {
  ExploreIcon,
  FarmHouseIcon,
  FavoriteIcon,
  HomeIcon,
  LandTabIcon,
  MapTabIcon,
  PlusIcon,
  SavedIcon,
  UserIcon,
  YardIcon,
} from '@svgs';
import { fonts } from '../../../src/assets/fonts';
import { ExploreStack } from '../explorestack';
import { useIntl } from '@context';
import { AddPropertiesContent, GenericModal, TopSpace } from '@components';
import { useNavigation } from '@react-navigation/native';

type TabStackParamList = {
  Account: undefined;
  ExploreStack: undefined;
  SavedProperties: undefined;
  ExploreMaps: undefined;
  Land: undefined;
  AllAgencies: undefined;
  AddOptions?: any;
  LandPropertyDetails: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

export const BottomTabNavigator = () => {
  const { intl } = useIntl();
  const navigation: any = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddProperty = () => {
    toggleModal();
    navigation.navigate('AddProperties');
  };

  const handlePromoteProperty = () => {
    toggleModal();
    navigation.navigate('PromoteProperty');
  };

  const handleRequestProperty = () => {
    toggleModal();
    navigation.navigate('RequestProperty');
  };

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


  // Animated values for scaling, rotating, and fading
  const animations = {
    ExploreStack: {
      scale: useRef(new Animated.Value(1)).current,
      rotate: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(1)).current,
    },
    ExploreMaps: {
      scale: useRef(new Animated.Value(1)).current,
      rotate: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(1)).current,
    },
    SavedProperties: {
      scale: useRef(new Animated.Value(1)).current,
      rotate: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(1)).current,
    },
    Account: {
      scale: useRef(new Animated.Value(1)).current,
      rotate: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(1)).current,
    },
    AddOptions: {
      scale: useRef(new Animated.Value(1)).current,
      rotate: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(1)).current,
    },
  };

  const animateIcon = (routeName, callback) => {
    Animated.sequence([
      Animated.timing(animations[routeName].scale, {
        toValue: 1.1, // Slight increase in scale
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animations[routeName].scale, {
        toValue: 1, // Return to original scale
        duration: 150,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };
  


const handleTabPress = (routeName, navigation) => {
  animateIcon(routeName, () => {
    navigation.navigate(routeName); // Navigate to the screen after animation
  });
};


  const customText = ({ text, focused }: any) => {
    const colorSelectionText = focused ? Colors.light.primaryBtn : Colors.light.headingTitle;

    return (
      <Text
        style={[
          styles.tabText,
          {
            color: colorSelectionText,
          },
        ]}>
        {text}
      </Text>
    );
  };

  const renderModal = () => (
    <GenericModal
      showCloseButton={false}
      centerText={true}
      modalTitle={intl.formatMessage({
        id: 'addPropertiesModal.header',
      })}
      fontFamily={Platform.OS === 'ios' ? fonts.tertiary.bold : fonts.secondary.bold}
      centeredModal={false}
      toggleModal={toggleModal}
      isVisible={modalVisible}>
      <TopSpace top={10} />
      <AddPropertiesContent
        handleAdd={handleAddProperty}
        handlePromote={handlePromoteProperty}
        handleRequest={handleRequestProperty}
      />
    </GenericModal>
  );

  return (
    <>
      <Tab.Navigator
        detachInactiveScreens={true}
        screenOptions={({ route }) => ({
          headerShown: false,
          lazy: true,
          tabBarShowLabel: true,
          tabBarStyle: [styles.tabBarStyle],
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({ focused }: any) => {
            let Icon: any;
            const animatedStyle = {
              transform: [
                { scale: animations[route.name].scale },
                {
                  rotate: animations[route.name].rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
              opacity: animations[route.name].opacity,
            };

            useEffect(() => {
              animateIcon(route.name, focused);
            }, [focused]);

            switch (route.name) {
              case 'ExploreStack':
                Icon = ExploreIcon;
                break;
              case 'ExploreMaps':
                Icon = MapTabIcon;
                break;
              case 'SavedProperties':
                Icon = FavoriteIcon;
                break;
              case 'AddOptions':
                Icon = PlusIcon;
                break;
              case 'AllAgencies':
                Icon = YardIcon;
                break;
              case 'Account':
                Icon = UserIcon;
                break;
              default:
                return null;
            }

            return (
              <TouchableOpacity onPress={() => handleTabPress(route.name, navigation)}>
                <Animated.View style={animatedStyle}>
                  <Icon
                    width={route.name === 'AddOptions' ? 15 : 22}
                    height={route.name === 'AddOptions' ? 15 : 22}
                    fill={focused ? Colors.light.primaryBtn : Colors.light.headingTitle}
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          },
        })}>
        <Tab.Screen
          name="ExploreStack"
          component={ExploreStack}
          options={{
            tabBarLabel: ({ focused }) =>
              customText({
                text: intl.formatMessage({
                  id: 'buttons.explore',
                }),
                focused,
              }),
          }}
        />

        <Tab.Screen
          name="ExploreMaps"
          component={ExploreMaps}
          options={{
            tabBarLabel: ({ focused }) =>
              customText({
                text: intl.formatMessage({
                  id: 'addpropertyScreen.map',
                }),
                focused,
              }),
          }}
        />

        <Tab.Screen
          name="AddOptions"
          component={() => null}
          options={{
            tabBarLabel: () => null,
            tabBarButton: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  padding: 4,
                  marginTop: 10,
                  bottom: Platform.OS === 'ios' ? 4 : 8,
                }}>
                <TouchableOpacity
                  style={styles.roundedCircle}
                  onPress={() => {
                    handleTabPress('AddOptions');
                    toggleModal();
                  }}>
                  <Animated.View style={{ transform: [{ scale: animations['AddOptions'].scale }] }}>
                    <PlusIcon
                      width={20}
                      height={20}
                      fill={Colors.light.headingTitle}
                    />
                  </Animated.View>
                </TouchableOpacity>
                {customText({
                  text: intl.formatMessage({
                    id: 'buttons.add',
                  }),
                  focused,
                })}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="SavedProperties"
          component={SavedProperties}
          options={{
            tabBarLabel: ({ focused }) =>
              customText({
                text: intl.formatMessage({
                  id: 'buttons.saved',
                }),
                focused,
              }),
          }}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: ({ focused }) =>
              customText({
                text: intl.formatMessage({
                  id: 'buttons.account',
                }),
                focused,
              }),
          }}
        />
      </Tab.Navigator>
      {renderModal()}
    </>
  );
};

const styles = StyleSheet.create({
  tabText: {
    fontSize: 11,
    fontFamily: fonts.primary.medium,
  },
  tabBarStyle: {
    backgroundColor: Colors.light.secondaryBackground,
    flexDirection: 'row',
    borderRadius: 20,
    margin: 4,
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    height: Platform.OS === 'ios' ? 60 : 45,
  },
  tabBarItemStyle: {
    height: Platform.OS === 'ios' ? 60 : 45,
    padding: 4,
    marginTop: 10,
    bottom: Platform.OS === 'ios' ? 14 : 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedCircle: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: Colors.light.headingTitle,
    borderWidth: 1.5,
  },
});

export default BottomTabNavigator;
