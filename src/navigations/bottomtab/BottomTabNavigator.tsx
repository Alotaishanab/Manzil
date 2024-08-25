/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import {Colors} from '@colors';
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
import {Text} from 'react-native';
import {fonts} from '../../../src/assets/fonts';
import {ExploreStack} from '../explorestack';
import {useIntl} from '@context';
import {AddPropertiesContent, GenericModal, TopSpace} from '@components';
import {useNavigation} from '@react-navigation/native';

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
  const {intl} = useIntl();
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

  const customText = ({text, focused}: any) => {
    console.log('text', text);
    const colorSelectionText = () => {
      if (focused) {
        return Colors.light.primaryBtn;
      } else {
        return Colors.light.headingTitle;
      }
    };

    return (
      <Text
        style={[
          styles.tabText,
          {
            color: colorSelectionText(),
          },
        ]}>
        {text}
      </Text>
    );
  };

  const renderModal = () => {
    return (
      <GenericModal
        showCloseButton={false}
        centerText={true}
        modalTitle={intl.formatMessage({
          id: 'addPropertiesModal.header',
        })}
        fontFamily={
          Platform.OS === 'ios' ? fonts.tertiary.bold : fonts.secondary.bold
        }
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
  };

  return (
    <>
      <Tab.Navigator
        detachInactiveScreens={true}
        screenOptions={({route}) => ({
          headerShown: false,
          lazy: true,
          tabBarShowLabel: true,
          tabBarStyle: [styles.tabBarStyle],

          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({color, focused}: any) => {
            var Icon: any;
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
              // case 'Land':
              //   Icon = LandTabIcon;
              //   break;
              case 'Account':
                // icon = "Discovery";
                Icon = UserIcon;
                break;
              default:
                break;
            }
            return (
              <>
                {route?.name === 'AddOptions' ? (
                  <View
                    style={[
                      styles.roundedCircle,
                      {
                        borderColor:
                          route?.name === 'AddOptions' && focused
                            ? Colors.light.primaryBtn
                            : Colors.light.headingTitle,
                      },
                    ]}>
                    <Icon
                      width={15}
                      height={15}
                      fill={
                        focused
                          ? Colors.light.primaryBtn
                          : Colors.light.headingTitle
                      }
                    />
                  </View>
                ) : (
                  <Icon
                    width={22}
                    height={22}
                    fill={
                      focused
                        ? Colors.light.primaryBtn
                        : Colors.light.headingTitle
                    }
                  />
                )}
              </>
            );
          },
        })}>
        <Tab.Screen
          name="ExploreStack"
          component={ExploreStack}
          options={{
            tabBarLabel: ({color, focused}) =>
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
            tabBarLabel: ({color, focused}) =>
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
            tabBarButton: ({color, focused}) => (
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
                  onPress={toggleModal}>
                  <PlusIcon
                    width={20}
                    height={20}
                    fill={Colors.light.headingTitle}
                  />
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
            tabBarLabel: ({color, focused}) =>
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
            tabBarLabel: ({color, focused}) =>
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
    // flex: 1,
    justifyContent: 'space-between', // Ensure equal spacing between tabs
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
