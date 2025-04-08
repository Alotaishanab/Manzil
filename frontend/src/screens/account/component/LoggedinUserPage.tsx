/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@colors';
import { useIntl } from '@context';
import { TopSpace } from '@components';
import IconTitleButtonArrow from '../../../components/molecules/IconTitleButtonArrow';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { fonts } from '@fonts';
import { useLogOutUser, useGetProfile } from '@services';
import useSessionManager from '../../../hooks/useSessionManager';
import {
  FavoriteIcon,
  LogoutIcon,
  MyPropertiesIcon,
  SubscriptionIcon,
  UserIcon,
} from '@svgs'; 
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '@context'; // Ensure the path is correct
import {
  useUpdateProfilePicture,
  useRemoveProfilePicture,
} from '@services'; // Ensure the path is correct
import { TouchableHighlight } from 'react-native-gesture-handler';

const LoggedinUserPage = ({
  toggleDeleteAccountModal,
}: any) => {
  const { intl, toggleLocale } = useIntl();
  const { mutate: logoutUser } = useLogOutUser();
  const { endSessionAndRevertToGuest } = useSessionManager();
  const { data: userData, isLoading, refetch: refetchProfile } = useGetProfile({ enabled: false });

  const navigation: any = useNavigation();
  const { token } = useContext(AuthContext); // Access token from AuthContext

  useEffect(() => {
    refetchProfile();
  }, [refetchProfile]);

  // Import the mutation hooks with refetchProfile in onSuccess
  const { mutate: updateProfilePicture } = useUpdateProfilePicture({
    onSuccess: () => {
      Alert.alert('Success', 'Profile picture updated.');
      refetchProfile(); // Refetch user info
    },
    onError: (error: Error) => {
      console.error('Update Profile Picture Error:', error);
      Alert.alert('Error', 'Failed to upload profile picture.');
    },
  });

  const { mutate: removeProfilePicture } = useRemoveProfilePicture({
    onSuccess: () => {
      Alert.alert('Success', 'Profile picture removed.');
      refetchProfile(); // Refetch user info
    },
    onError: (error: Error) => {
      console.error('Remove Profile Picture Error:', error);
      Alert.alert('Error', 'Failed to remove profile picture.');
    },
  });

  // Handler functions...
  const handleEmail = () => {
    navigation.navigate('Auth', { screen: 'ChangeEmail' });
  };

  const handleChangePassword = () => {
    navigation.navigate('Auth', { screen: 'ChangePassword' });
  };

  const handleNotifications = () => {
    navigation.navigate('Auth', { screen: 'Notifications' });
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('Auth', { screen: 'PrivacyPolicy' });
  };

  const handleTermsOfUse = () => {
    navigation.navigate('Auth', { screen: 'TermsOfUse' });
  };

  const handleSendFeedback = () => {
    navigation.navigate('Auth', { screen: 'SendFeedback' });
  };

  const handleDeleteAccount = () => {
    navigation.navigate('Auth', { screen: 'DeleteAccount' });
  };

  const toggleLanguage = () => {
    toggleLocale();
  };

  const handleSubscription = () => {
    navigation.navigate('Auth', { screen: 'Subscriptions' });
  };

  const handlePaymentMethod = () => {
    navigation.navigate('Auth', { screen: 'PaymentMethods' });
  };

  const handlePaymentHistory = () => {
    navigation.navigate('Auth', { screen: 'PaymentHistory' });
  };

  const handleAnalytics = () => {
    navigation.navigate('Auth', { screen: 'Analytics' });
  };

  const handleMyProperties = () => {
    navigation.navigate('Auth', { screen: 'ListedProperties' });
  };

  const handleSubscribed = () => {
    navigation.navigate('Auth', { screen: 'Subscribed' });
  };

  const handleHelp = () => {
    navigation.navigate('Auth', { screen: 'ChatWithUs' });
  };

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: async () => {
        console.log('Logout successful, resetting to guest session.');

        // 1) Let session manager revert to guest
        await endSessionAndRevertToGuest();

        // 2) Navigate away
        navigation.navigate('Explore');
      },
      onError: () => {
        console.error('Error logging out user.');
      },
    });
  };

  const handleSavedProperties = () => {
    navigation.navigate('Auth', { screen: 'SavedProperties' });
  };

  const renderSkeleton = () => {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item margin={10}>
          <SkeletonPlaceholder.Item
            width={150}
            height={20}
            borderRadius={4}
            marginBottom={10}
          />
          <SkeletonPlaceholder.Item
            width={220}
            height={16}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  const pickImage = async () => {
    // Launch image library
    const options = {
      mediaType: 'photo' as const,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to select image.');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          updateProfilePicture({ uri: asset.uri }); // Trigger the mutation
        } else {
          Alert.alert('Error', 'Failed to retrieve image URI.');
        }
      }
    });
  };

  const handleRemoveProfilePicture = () => {
    Alert.alert(
      'Confirm Removal',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => removeProfilePicture({}) }, // Trigger the mutation
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header View */}
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          {intl.formatMessage({
            id: 'accountScreen.loggedin.account',
          })}
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainWrap}>
        {/* User Information Section */}
        <TouchableHighlight>
        <View style={styles.userInfoContainer}>
          {/* Profile Picture with Outer Circle */}
          
            <View style={styles.profileOuterCircle}>
              {isLoading || !userData ? (
                <View style={styles.profileImagePlaceholder}>
                  <ActivityIndicator size="small" color="#0000ff" />
                </View>
              ) : userData.profile_picture ? (
                <Image
                  source={{ uri: userData.profile_picture }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.userIconContainer}>
                  <UserIcon width={80} height={80} />
                </View>
              )}
            </View>

          {/* User Details */}
          <View style={styles.userDetails}>
            {isLoading || !userData ? (
              renderSkeleton()
            ) : (
              <>
                <Text
                  style={styles.greetingText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {intl.formatMessage({ id: 'accountScreen.loggedin.hello' })}{' '}
                  {userData.name}
                </Text>
                <Text
                  style={styles.emailText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {userData.email}
                </Text>

                {/* Remove Profile Picture Text */}
                {userData.profile_picture && (
                  <Text
                    style={styles.removeText}
                    onPress={handleRemoveProfilePicture}
                  >
                    {intl.formatMessage({
                      id: 'accountScreen.loggedin.remove-picture',
                    })}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
        </TouchableHighlight>
      

        {/* Rest of the UI components */}
        <View style={styles.outerContainer}>
          {/* Quick Actions */}
          <View style={styles.SavedContainer}>
            {/* Saved */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSavedProperties}
            >
              <FavoriteIcon width={24} height={24} fill="red" />
              <Text style={styles.actionText}>
                {intl.formatMessage({ id: 'buttons.saved' })}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.PropertiesContainer}>
            {/* My Properties */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleMyProperties}
            >
              <MyPropertiesIcon width={24} height={24} fill="black" />
              <Text style={styles.actionText}>
                {intl.formatMessage({
                  id: 'accountScreen.loggedin.my-properties',
                })}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SubscriptionsContainer}>
            {/* Subscriptions */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSubscription}
            >
              <SubscriptionIcon width={24} height={24} fill="black" />
              <Text style={styles.actionText}>
                {intl.formatMessage({
                  id: 'accountScreen.loggedin.subscriptions',
                })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Settings Section */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
          <View style={styles.sectionView}>
            <Text style={styles.sectionTitle}>
              {intl.formatMessage({ id: 'accountScreen.loggedin.profile' })}
            </Text>

            {/* Other menu items */}
            <IconTitleButtonArrow
              iconName={'SubscriptionIcon'}
              handleClick={handleSubscribed}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.subscribed',
              })}
            />

            <IconTitleButtonArrow
              handleClick={handlePaymentMethod}
              iconName={'PaymentIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.payment-methods',
              })}
            />

            <IconTitleButtonArrow
              handleClick={handlePaymentHistory}
              iconName={'PaymentHistoryIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.payment-history',
              })}
            />

            <IconTitleButtonArrow
              iconName={'AlertIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.notifications',
              })}
              handleClick={handleNotifications}
            />
            <IconTitleButtonArrow
              iconName={'AlertIcon'}
              title={intl.formatMessage({
                id: 'analyticScreen.header',
              })}
              handleClick={handleAnalytics}
            />
          </View>
        </View>

        {/* Account Settings Section */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
          <View style={styles.sectionView}>
            <Text style={styles.sectionTitle}>
              {intl.formatMessage({
                id: 'accountScreen.loggedin.account-settings',
              })}
            </Text>

            <IconTitleButtonArrow
              iconName={'MailIcon'}
              handleClick={handleEmail}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.change-email',
              })}
            />

            <IconTitleButtonArrow
              handleClick={handleChangePassword}
              iconName={'LockIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.change-password',
              })}
            />

            <IconTitleButtonArrow
              iconName={'LanguageIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.change-language',
              })}
              handleClick={toggleLanguage}
            />
            <IconTitleButtonArrow
              handleClick={handleDeleteAccount}
              iconName={'TrashIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.delete-account',
              })}
            />
          </View>
        </View>

        {/* Legal Section */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
          <View style={styles.sectionView}>
            <Text style={styles.sectionTitle}>
              {intl.formatMessage({
                id: 'accountScreen.loggedin.legal',
              })}
            </Text>
            <TopSpace top={5} />

            <IconTitleButtonArrow
              handleClick={handlePrivacyPolicy}
              iconName={'PrivacyPolicyIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.privacy-policy',
              })}
            />
            <IconTitleButtonArrow
              handleClick={handleTermsOfUse}
              iconName={'TermsUseIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.terms-use',
              })}
            />

            <IconTitleButtonArrow
              iconName={'FalicenseIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.fal-license',
              })}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
          <View style={styles.sectionView}>
            <Text style={styles.sectionTitle}>
              {intl.formatMessage({
                id: 'accountScreen.loggedin.support',
              })}
            </Text>
            <TopSpace top={5} />

            <IconTitleButtonArrow
              iconName={'HelpIcon'}
              handleClick={handleHelp}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.help',
              })}
            />
            <IconTitleButtonArrow
              handleClick={handleSendFeedback}
              iconName={'SendFeedbackIcon'}
              title={intl.formatMessage({
                id: 'accountScreen.loggedin.send-us-feedback',
              })}
            />
          </View>
        </View>

        {/* Logout Section */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
          <View
            style={{
              borderRadius: 20,
              paddingHorizontal: 20,
              backgroundColor: Colors.light.background,
            }}
          >
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LogoutIcon width={24} height={24} fill="red" />
                <Text style={styles.logoutText}>
                  {intl.formatMessage({
                    id: 'accountScreen.loggedin.logout',
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TopSpace top={50} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoggedinUserPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerView: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: Colors.light.black,
  },
  mainWrap: {
    flex: 1,
    backgroundColor: Colors.light.secondaryBackground,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    marginTop: 4,
  },
  profileOuterCircle: {
    borderWidth: 2,
    borderColor: Colors.light.black,
    borderRadius: 44,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.light.onPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileIconTouchable: {},
  userDetails: {
    flex: 1,
    maxWidth: '100%',
    marginLeft: 15, // Move to the right a bit
  },
  greetingText: {
    color: Colors.light.headingTitle,
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  emailText: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    marginTop: 4,
  },
  removeText: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 10,
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  SavedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '20%',
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    marginTop: 4,
  },
  PropertiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '33%',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    marginTop: 4,
  },
  SubscriptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '32%',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    marginTop: 4,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    color: 'black',
    fontSize: 12,
    fontFamily: fonts.primary.medium,
  },
  sectionView: {
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: fonts.primary.medium,
    color: Colors.light.profile,
    fontSize: 16,
    marginBottom: 10,
  },
  skeletonName: {
    backgroundColor: '#E0E0E0',
    height: 22,
    width: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  skeletonEmail: {
    backgroundColor: '#E0E0E0',
    height: 14,
    width: 200,
    borderRadius: 10,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoutText: {
    color: 'red',
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: fonts.primary.medium,
  },
});
