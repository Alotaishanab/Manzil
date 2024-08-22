/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '@colors';
import {useIntl} from '@context';
import {TopSpace} from '@components';
import IconTitleButtonArrow from '../../../../src/components/molecules/IconTitleButtonArrow';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '@fonts';

const LoggedinUserPage = ({}: any) => {
  const {intl, toggleLocale} = useIntl();

  const navigation: any = useNavigation();

  const handleEmail = () => {
    navigation.navigate('ChangeEmail');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };
  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleTermsOfUse = () => {
    navigation.navigate('TermsOfUse');
  };

  const handleSendFeedback = () => {
    navigation.navigate('SendFeedback');
  };
  const handleDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  };
  const toggleLanguage = () => {
    toggleLocale();
  };

  const handleSubscription = () => {
    navigation.navigate('Subscriptions');
  };
  const handlePaymentMethod = () => {
    navigation.navigate('PaymentMethods');
  };
  const handlePaymentHistory = () => {
    navigation.navigate('PaymentHistory');
  };
  const handleAnalytics = () => {
    navigation.navigate('Analytics');
  };

  const handleMyProperties = () => {
    navigation.navigate('ListedProperties');
  };

  const handleSubscribed = () => {
    navigation.navigate('Subscribed');
  };

  const handleHelp = () => {
    navigation.navigate('ChatWithUs');
  };
  const handleLogout = () => {
    navigation.navigate('Login');
  };
  const handleRequests = () => {
    navigation.navigate('RequestList');
  };
  return (
    <View style={styles.mainWrap}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          {intl.formatMessage({
            id: 'accountScreen.loggedin.account',
          })}
        </Text>
      </View>

      <View
        style={{
          padding: 6,
          paddingHorizontal: 10,
          // margin: 15,
          marginHorizontal: 10,
          marginVertical: 5,
          borderRadius: 20,
          backgroundColor: Colors.light.background,
          marginTop: 4,
        }}>
        <Text style={styles.greetingText}>
          {intl.formatMessage({id: 'accountScreen.loggedin.hello'})} Faisal
        </Text>
        <Text style={styles.emailText}>faisal@gmail.com</Text>
      </View>

      <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
        <View style={styles.sectionView}>
          <Text style={styles.sectionTitle}>
            {intl.formatMessage({id: 'accountScreen.loggedin.profile'})}
          </Text>

          {/* <IconTitleButtonArrow
            iconName={'PersonalDetailIcon'}
            title={intl.formatMessage({
              id: 'accountScreen.loggedin.personal-details',
            })}
          /> */}

          <IconTitleButtonArrow
            iconName={'MyPropertiesIcon'}
            handleClick={handleMyProperties}
            title={intl.formatMessage({
              id: 'accountScreen.loggedin.my-properties',
            })}
          />
          <IconTitleButtonArrow
            iconName={'MyPropertiesIcon'}
            handleClick={handleRequests}
            title={intl.formatMessage({
              id: 'buttons.requests',
            })}
          />

          <IconTitleButtonArrow
            iconName={'SubscriptionIcon'}
            handleClick={handleSubscription}
            title={intl.formatMessage({
              id: 'accountScreen.loggedin.subscriptions',
            })}
          />

          <IconTitleButtonArrow
            iconName={'SubscriptionIcon'}
            handleClick={handleSubscribed}
            title={intl.formatMessage({
              id: 'accountScreen.loggedin.subscribed',
            })}
          />
          {/*  */}

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

          {/*  */}
          {/* <IconTitleButtonArrow
            handleClick={handleSavedSearches}
            iconName={'SavedIcon'}
            title={intl.formatMessage({
              id: 'accountScreen.loggedin.saved-searches',
            })}
          /> */}
        </View>
      </View>

      <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
        <View style={styles.sectionView}>
          <Text style={styles.sectionTitle}>
            {intl.formatMessage({
              id: 'accountScreen.loggedin.account-settings',
            })}
          </Text>
          {/* <TopSpace top={5} /> */}

          <IconTitleButtonArrow
            iconName={'MailIcon'}
            handleClick={handleEmail}
            title={intl.formatMessage({
              id: 'accountScreen.loggedin.change-email',
            })}
          />

          {/*  */}
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

      <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
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
      {/* <TopSpace top={15} /> */}

      <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
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

          {/* <IconTitleButtonArrow
            iconName={'FeedbackIcon'}
            title={intl.formatMessage({
              id: 'accountScreen.loggedin.legal-documents',
            })}
          /> */}
        </View>
      </View>

      <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
        <View
          style={{
            borderRadius: 20,
            paddingHorizontal: 20,
            backgroundColor: Colors.light.background,
          }}>
          <IconTitleButtonArrow
            iconName={'LogoutIcon'}
            handleClick={handleLogout}
            title={intl.formatMessage({
              id: 'accountScreen.loggedin.logout',
            })}
          />
        </View>
        <TopSpace top={10} />
      </View>
    </View>
  );
};

export default LoggedinUserPage;

const styles = StyleSheet.create({
  mainWrap: {
    flexGrow: 1,
    backgroundColor: Colors.light.secondaryBackground,
  },
  headerView: {
    backgroundColor: Colors.light.background,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.light.headingTitle,
    fontSize: 26,
    fontFamily: fonts.tertiary.bold,
  },
  greetingText: {
    color: Colors.light.headingTitle,
    fontSize: 22,
    fontFamily: fonts.primary.bold,
  },
  emailText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  sectionView: {
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  sectionTitle: {
    fontFamily: fonts.primary.medium,
    color: Colors.light.profile,
    fontSize: 16,
  },
});
