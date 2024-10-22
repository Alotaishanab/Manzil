import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {createIntl, createIntlCache, IntlShape} from '@formatjs/intl';
import en from '../locales/en.json'; // Make sure paths are correct
import ar from '../locales/ar.json'; // Make sure paths are correct

const cache = createIntlCache();

const messages = {en, ar};

interface IntlContextProps {
  formatMessage(arg0: { id: string; defaultMessage: string; }): React.ReactNode;
  intl: IntlShape;
  locale: string;
  toggleLocale: () => void;
}

const IntlContext = createContext<IntlContextProps>({
  intl: createIntl({locale: 'ar', messages: ar}, cache),
  locale: 'ar',
  toggleLocale: () => {}, // No-op by default
});

export const IntlProvider: React.FC<{children: ReactNode; locale: string}> = ({
  children,
  locale: initialLocale,
}) => {
  const [locale, setLocale] = useState(initialLocale);
  const [intl, setIntl] = useState(
    createIntl(
      {
        locale: initialLocale,
        messages: messages[initialLocale as keyof typeof messages],
      },
      cache,
    ),
  );

  useEffect(() => {
    const newMessages = messages[locale as keyof typeof messages];
    const newIntl = createIntl({locale, messages: newMessages}, cache);
    setIntl(newIntl);
  }, [locale]);

  const toggleLocale = () => {
    setLocale(prevLocale => (prevLocale === 'en' ? 'ar' : 'en'));
  };

  return (
    <IntlContext.Provider value={{intl, locale, toggleLocale}}>
      {children}
    </IntlContext.Provider>
  );
};

export const useIntl = () => useContext(IntlContext);
