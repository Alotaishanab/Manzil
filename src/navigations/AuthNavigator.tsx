import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native'; // Add this line

import {
  Account,
  AddCards,
  AddProperties,
  AgencyDetails,
  Analytics,
  ChangeEmail,
  ChangePassword,
  ChatWithUs,
  Checkout,
  ExploreProperty,
  ExploreSearch,
  FilterProperty,
  ForgotPassword,
  PropertyScreen,
  ListedProperties,
  Login,
  Notifications,
  Onboarding,
  OtpVerification,
  PaymentCardsConfirmation,
  PaymentHistory,
  PaymentMethods,
  PrivacyPolicy,
  PromoteProperty,
  RequestProperty,
  ResetPassword,
  SavedProperties,
  SendFeedback,
  CreateAccount,
  SplashScreen,
  Subscribed,
  Subscriptions,
  TermsOfUse,
  Welcome,
  Signup,
  SignupOtpVerification,
  DeleteAccount,
  AllAgencies,
  ChangePasswordOtpVerification,
  RequestList,
  PropertiesRequestStatus,
  SimilarProperties,
  CenterScreen,
} from '@screens';
import {BottomTabNavigator} from './bottomtab/BottomTabNavigator';

export type AuthScreenProps<RouteName extends keyof AuthStackParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, RouteName>,
    StackNavigationProp<AuthStackParamList, keyof AuthStackParamList>
  >;
  route: RouteProp<AuthStackParamList, RouteName>;
};

type AuthStackParamList = {
  SplashScreen: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup?: undefined;
  LoginScreen: undefined;
  CreateAccount: undefined;
  ResetPassword: undefined;
  ForgotPassword: undefined;
  FilterProperty: undefined;
  LandPropertyDetails: undefined;
  ExploreSearch: any;
  SavedProperties?: any;
  OtpVerification: any;
  BottomTabNavigator?: any;
  ChangeEmail?: any;
  ChangePassword?: any;
  ExploreProperty?: any;
  PrivacyPolicy?: any;
  TermsOfUse?: any;
  Notifications?: any;
  SendFeedback?: any;
  Account?: any;
  RequestProperty?: any;
  PaymentHistory?: any;
  PaymentMethods?: any;
  Subscriptions?: any;
  ChatWithUs?: any;
  Analytics?: any;
  AddProperties?: any;
  PromoteProperty?: any;
  ListedProperties?: any;
  AgencyDetails?: any;
  Checkout?: any;
  AddCards?: any;
  PaymentCardsConfirmation?: any;
  Subscribed?: any;
  SignupOtpVerification?: any;
  DeleteAccount: any;
  AllAgencies?: any;
  ChangePasswordOtpVerification?: any;
  RequestList?: any;
  PropertiesRequestStatus?: any;
  ParentalGate: {nextScreen: keyof AuthStackParamList};
  SimilarProperties?: any;
  CenterScreen?: any;
  PropertyScreen?: any;
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SplashScreen" // SplashScreen  // Analytics // AddProperties
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        //  options={options}
      />

      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="OtpVerification" component={OtpVerification} />
      <AuthStack.Screen
        name="SignupOtpVerification"
        component={SignupOtpVerification}
      />

      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />

      <AuthStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <AuthStack.Screen name="ExploreSearch" component={ExploreSearch} />
      <AuthStack.Screen name="FilterProperty" component={FilterProperty} />
      <AuthStack.Screen name="PropertyScreen" component={PropertyScreen} />
      <AuthStack.Screen name="ExploreProperty" component={ExploreProperty} />
      <AuthStack.Screen name="AddProperties" component={AddProperties} />

      <AuthStack.Screen name="SavedProperties" component={SavedProperties} />
      <AuthStack.Screen name="ChangeEmail" component={ChangeEmail} />
      <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
      <AuthStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <AuthStack.Screen name="TermsOfUse" component={TermsOfUse} />
      <AuthStack.Screen name="Notifications" component={Notifications} />
      <AuthStack.Screen name="Account" component={Account} />
      <AuthStack.Screen name="SendFeedback" component={SendFeedback} />
      <AuthStack.Screen name="RequestProperty" component={RequestProperty} />
      <AuthStack.Screen name="PaymentHistory" component={PaymentHistory} />
      <AuthStack.Screen name="PaymentMethods" component={PaymentMethods} />
      <AuthStack.Screen name="Subscriptions" component={Subscriptions} />
      <AuthStack.Screen name="ChatWithUs" component={ChatWithUs} />
      <AuthStack.Screen name="Analytics" component={Analytics} />
      <AuthStack.Screen name="PromoteProperty" component={PromoteProperty} />
      <AuthStack.Screen name="ListedProperties" component={ListedProperties} />

      <AuthStack.Screen name="AllAgencies" component={AllAgencies} />

      <AuthStack.Screen name="AgencyDetails" component={AgencyDetails} />
      <AuthStack.Screen name="Checkout" component={Checkout} />
      <AuthStack.Screen name="AddCards" component={AddCards} />
      <AuthStack.Screen
        name="PaymentCardsConfirmation"
        component={PaymentCardsConfirmation}
      />
      <AuthStack.Screen
        name="ChangePasswordOtpVerification"
        component={ChangePasswordOtpVerification}
      />

      <AuthStack.Screen name="Subscribed" component={Subscribed} />
      <AuthStack.Screen name="DeleteAccount" component={DeleteAccount} />
      <AuthStack.Screen name="RequestList" component={RequestList} />
      <AuthStack.Screen
        name="PropertiesRequestStatus"
        component={PropertiesRequestStatus}
      />
      
      <AuthStack.Screen name="SimilarProperties" component={SimilarProperties} />
      <AuthStack.Screen name="CenterScreen" component={CenterScreen} />
      <AuthStack.Screen
        name="SimilarProperties"
        component={SimilarProperties}
      />
    </AuthStack.Navigator>
  );
};
