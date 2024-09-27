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
import { Account, ExploreMaps, SavedProperties, CenterScreen } from '@screens';
import { Colors } from '@colors';
import {
  ExploreIcon,
  FavoriteIcon,
  MapTabIcon,
  PlusIcon,
  UserIcon,
} from '@svgs';
import { fonts } from '../../../src/assets/fonts';
import { ExploreStack } from '../explorestack';
import { useIntl } from '@context';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const { width: screenWidth } = Dimensions.get('window');

export const BottomTabNavigator = () => {
  const { intl } = useIntl();

  const customText = ({ text, focused }) => {
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
    <Tab.Navigator
  detachInactiveScreens={true}
  tabBar={(props) => <CustomTabBar {...props} />}
>
  <Tab.Screen
    name="ExploreStack"
    component={ExploreStack}
    options={{
      headerShown: false, // Remove header
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
      headerShown: false, // Remove header
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
    name="Manzili"
    component={CenterScreen}
    options={{
      headerShown: false, // Remove header
      tabBarLabel: () => null,
    }}
  />

  <Tab.Screen
    name="SavedProperties"
    component={SavedProperties}
    options={{
      headerShown: false, // Remove header
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
      headerShown: false, // Remove header
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

  );
};

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
  }, [state.index]);

  return (
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
            case 'SavedProperties':
              Icon = FavoriteIcon;
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
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabBarItemStyle}
            >
              <Icon
                width={route.name === 'Manzili' ? 28 : 22}
                height={route.name === 'Manzili' ? 28 : 22}
                fill={isFocused ? Colors.light.primaryBtn : Colors.light.headingTitle}
              />
              {options.tabBarLabel ? (
                options.tabBarLabel({ focused: isFocused })
              ) : (
                <Text
                  style={[
                    styles.tabText,
                    { color: isFocused ? Colors.light.primaryBtn : Colors.light.headingTitle },
                  ]}
                >
                  {route.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
            transform: [{ translateX: indicatorPosition }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabText: {
    fontSize: 11,
    fontFamily: fonts.primary.medium,
  },
  tabBarStyle: {
    backgroundColor: Colors.light.secondaryBackground,
    borderRadius: 20,
    margin: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: Platform.OS === 'ios' ? 70 : 55,
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
    height: 4,
    backgroundColor: 'green', // Green horizontal line
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default BottomTabNavigator;
