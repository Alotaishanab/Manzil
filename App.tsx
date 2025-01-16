// src/App.tsx

import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import ErrorBoundary from 'react-native-error-boundary';
import FlashMessage from 'react-native-flash-message';
import { CustomFallback } from './src/components';
import { enableScreens } from 'react-native-screens';
import { getLocales } from 'react-native-localize';
import { HideWarnings } from './src/helpers';
import { SplashScreen } from './src/screens/splash';
import { AuthNavigator } from './src/navigations';
import { BottomTabNavigator } from './src/navigations/bottomtab/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { IntlProvider } from './src/context';
import { AuthProvider } from './src/context';
import { WebSocketProvider } from './src/context';
import useSessionManager from './src/hooks/useSessionManager';

// -----------------------------------
// 1) Create a Stack outside
const queryClient = new QueryClient();
const Stack = createStackNavigator();

// -----------------------------------
// 2) Child component that calls useSessionManager
function AppWithSessionManager() {
  useSessionManager();  // Kick off the session tracking (and heartbeats)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
      <FlashMessage position="top" hideStatusBar={false} />
    </NavigationContainer>
  );
}

// -----------------------------------
// 3) Main App sets up providers and returns the child
export default function App(): React.JSX.Element {
  const [locale, setLocale] = useState('en');

  // Get the locale of the device.
  const determineLocale = () => {
    const deviceLocales = getLocales();
    if (deviceLocales && deviceLocales.length > 0) {
      const deviceLocale = deviceLocales[0].languageCode;
      setLocale(deviceLocale === 'en' ? 'en' : 'ar');
    }
  };

  useEffect(() => {
    determineLocale();
    HideWarnings();
  }, []);

  // For react-native-screens performance
  enableScreens(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <ErrorBoundary FallbackComponent={CustomFallback}>
            <IntlProvider locale={locale}>
              {/* 
                AuthProvider -> WebSocketProvider -> AppWithSessionManager 
                ensures the AuthContext is available BEFORE session logic runs.
              */}
              <AuthProvider>
                <WebSocketProvider>
                  <AppWithSessionManager />
                </WebSocketProvider>
              </AuthProvider>
            </IntlProvider>
          </ErrorBoundary>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
