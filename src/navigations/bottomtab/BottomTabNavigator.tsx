// src/navigation/bottomtab/BottomTabNavigator.tsx
import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Haptic from 'react-native-haptic-feedback';
import { BlurView } from '@react-native-community/blur'; // Make sure this is installed/linked

// Import your screens/stacks/icons properly:
import {
  Account,
  ExploreMaps,
  Messages,
  CenterScreen,
} from '@screens';
import { ExploreStack } from '../explorestack';
import {
  ExploreIcon,
  MapTabIcon,
  PlusIcon,
  MessagesIcon,
  UserIcon,
} from '@svgs';
import { Colors } from '@colors';
import { fonts } from '../../../src/assets/fonts';
import { useIntl } from '@context';

const { width: screenWidth } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { intl } = useIntl();

  const customText = ({ text, focused }) => {
    const colorSelectionText = focused
      ? Colors.light.primaryBtn
      : Colors.light.headingTitle;
    return (
      <Text style={[styles.tabText, { color: colorSelectionText }]}>
        {text}
      </Text>
    );
  };

  return (
    <Tab.Navigator
      detachInactiveScreens={true}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="ExploreStack"
        component={ExploreStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            customText({
              text: intl.formatMessage({ id: 'buttons.explore' }),
              focused,
            }),
        }}
      />

      <Tab.Screen
        name="ExploreMaps"
        component={ExploreMaps}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            customText({
              text: intl.formatMessage({ id: 'addpropertyScreen.map' }),
              focused,
            }),
        }}
      />

      <Tab.Screen
        name="Manzili"
        component={CenterScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => null, // no label for the center tab
        }}
      />

      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            customText({
              text: intl.formatMessage({ id: 'buttons.messages' }),
              focused,
            }),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            customText({
              text: intl.formatMessage({ id: 'buttons.account' }),
              focused,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

// The custom glassmorphic tab bar
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const tabWidth = screenWidth / state.routes.length;
  const indicatorPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(indicatorPosition, {
      toValue: state.index * tabWidth,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth, indicatorPosition]);

  const handleHapticFeedback = () => {
    Haptic.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  };

  return (
    <View style={styles.tabBarWrapper}>
      {/* The BlurView that gives the glass effect */}
      <BlurView
        style={styles.blurView}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.tabBarStyle}>
        <View style={styles.tabBarContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                handleHapticFeedback();
                navigation.navigate(route.name);
              }
            };

            let Icon;
            switch (route.name) {
              case 'ExploreStack':
                Icon = ExploreIcon;
                break;
              case 'ExploreMaps':
                Icon = MapTabIcon;
                break;
              case 'Manzili':
                Icon = PlusIcon;
                break;
              case 'Messages':
                Icon = MessagesIcon;
                break;
              case 'Account':
                Icon = UserIcon;
                break;
              default:
                return null;
            }

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabBarItemStyle}
              >
                <Icon
                  width={route.name === 'Manzili' ? 28 : 22}
                  height={route.name === 'Manzili' ? 28 : 22}
                  fill={
                    isFocused
                      ? Colors.light.primaryBtn
                      : Colors.light.headingTitle
                  }
                />
                {options.tabBarLabel ? (
                  options.tabBarLabel({ focused: isFocused })
                ) : (
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: isFocused
                          ? Colors.light.primaryBtn
                          : Colors.light.headingTitle,
                      },
                    ]}
                  >
                    {route.name}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* The sliding indicator at the bottom */}
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth,
              transform: [{ translateX: indicatorPosition }],
              borderTopLeftRadius: state.index === 0 ? 20 : 0,
              borderTopRightRadius:
                state.index === state.routes.length - 1 ? 20 : 0,
            },
          ]}
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  tabText: {
    fontSize: 11,
    fontFamily: fonts.primary.medium,
  },
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Shadows for depth
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  tabBarStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: Platform.OS === 'ios' ? 70 : 55,
    justifyContent: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabBarItemStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: Colors.light.primaryBtn,
  },
});

export default BottomTabNavigator;
