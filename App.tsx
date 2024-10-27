import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { IntlProvider } from '@context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import ErrorBoundary from 'react-native-error-boundary';
import FlashMessage from 'react-native-flash-message';
import { CustomFallback } from '@components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { enableScreens } from 'react-native-screens';
import { getLocales } from 'react-native-localize';
import { HideWarnings } from '@helpers';
import AsyncHelper from './src/helpers/asyncHelper'; // Importing AsyncHelper
import { SplashScreen } from './src/screens/splash'; // Importing the SplashScreen
import { AuthNavigator } from './src/navigations';
import { BottomTabNavigator } from './src/navigations/bottomtab/BottomTabNavigator'; // Assuming this is your Explore
import { createStackNavigator } from '@react-navigation/stack';
import useSessionTracker from './src/hooks/useSessionTracker'; // Import the custom session tracker hook

// Initialize the Query Client
const queryClient = new QueryClient();
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const [locale, setLocale] = useState('en');
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  const determineLocale = () => {
    const deviceLocales = getLocales();
    if (deviceLocales && deviceLocales.length > 0) {
      const deviceLocale = deviceLocales[0].languageCode;
      setLocale(deviceLocale === 'en' ? 'en' : 'ar');
    }
  };

  const checkFirstTimeStatus = async () => {
    const firstTime = await AsyncHelper.isFirstTime();
    setIsFirstTime(firstTime);
  };

  useSessionTracker(); // Utilize the custom session tracking hook

  useEffect(() => {
    determineLocale();
    checkFirstTimeStatus();
    HideWarnings();
  }, []);

  enableScreens(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <ErrorBoundary FallbackComponent={CustomFallback}>
            <IntlProvider locale={locale}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Splash" component={SplashScreen} />
                  <Stack.Screen name="Auth" component={AuthNavigator} />
                  <Stack.Screen name="MainApp" component={BottomTabNavigator} />
                </Stack.Navigator>
                <FlashMessage position="top" hideStatusBar={false} />
              </NavigationContainer>
            </IntlProvider>
          </ErrorBoundary>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
