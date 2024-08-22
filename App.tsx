/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {IntlProvider} from '@context';
import React, {useEffect, useState} from 'react';
import {getLocales} from 'react-native-localize';
import {AuthNavigator} from './src/navigations';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import ErrorBoundary from 'react-native-error-boundary';
import {CustomFallback} from '@components';
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {enableScreens} from 'react-native-screens';

function App(): React.JSX.Element {
  const [locale, setLocale] = useState('en'); // Default locale is French

  const determineLocale = () => {
    const deviceLocales = getLocales();
    console.log('locales ', deviceLocales[0].languageCode);
    if (deviceLocales && deviceLocales.length > 0) {
      const deviceLocale = deviceLocales[0].languageCode;
      setLocale(deviceLocale === 'en' ? 'en' : 'ar');
    }
  };

  useEffect(() => {
    determineLocale();
  }, []);
  // const queryClient = new QueryClient();
  enableScreens(true);

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <ErrorBoundary FallbackComponent={CustomFallback}>
          <IntlProvider locale={locale}>
            {/* <QueryClientProvider client={queryClient}> */}
            <NavigationContainer>
              <AuthNavigator />
            </NavigationContainer>
            {/* </QueryClientProvider> */}
          </IntlProvider>
        </ErrorBoundary>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;
