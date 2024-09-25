/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Account, Explore, ExploreMaps, SavedProperties, CenterScreen } from '@screens'; // Import CenterScreen
import { Colors } from '@colors';
import { ExploreIcon, FavoriteIcon, MapTabIcon, PlusIcon, UserIcon } from '@svgs'; // Import relevant SVGs
import { fonts } from '../../../src/assets/fonts';
import { ExploreStack } from '../explorestack';
import { useIntl } from '@context';
import { useNavigation } from '@react-navigation/native';

type TabStackParamList = {
  Account: undefined;
  ExploreStack: undefined;
  SavedProperties: undefined;
  ExploreMaps: undefined;
  AddOptions?: any;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

export const BottomTabNavigator = () => {
  const { intl } = useIntl();
  const navigation: any = useNavigation();

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

  const handleTabPress = (routeName) => {
    animateIcon(routeName);
    navigation.navigate(routeName);
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
        ]}
      >
        {text}
      </Text>
    );
  };

  return (
    <>
      <Tab.Navigator
      detachInactiveScreens={true}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: [styles.tabBarStyle],
        tabBarLabelPosition: 'below-icon',
        tabBarIcon: ({ focused }) => {
          let Icon;
          const animatedStyle = {
            transform: [{ scale: animations[route.name].scale }],
            opacity: animations[route.name].opacity,
          };

          useEffect(() => {
            animateIcon(route.name);
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
            case 'Account':
              Icon = UserIcon;
              break;
            default:
              return null;
          }

          return (
            <TouchableOpacity onPress={() => handleTabPress(route.name)}>
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
      })}
    >
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
        component={CenterScreen}
        options={{
          tabBarLabel: () => null,
          tabBarButton: () => (
            <View style={styles.addOptionsButton}>
              <TouchableOpacity
                style={styles.roundedCircle}
                onPress={() => handleTabPress('AddOptions')}
              >
                <Animated.View style={{ transform: [{ scale: animations['AddOptions'].scale }] }}>
                  <PlusIcon width={20} height={20} fill={Colors.light.headingTitle} />
                </Animated.View>
              </TouchableOpacity>
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
  addOptionsButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'green',
  },
});

export default BottomTabNavigator;
