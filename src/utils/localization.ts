import {createIntl, createIntlCache, IntlShape} from '@formatjs/intl';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

const messages = {en, ar};

const cache = createIntlCache();

export const createIntlInstance = (locale: string): IntlShape => {
  return createIntl(
    {
      locale,
      messages: messages[locale as keyof typeof messages],
    },
    cache,
  );
};
