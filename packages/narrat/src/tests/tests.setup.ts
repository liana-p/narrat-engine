import { defaultLocalizationStrings } from '@/data/default-strings';
import { strings } from '@/examples/default/strings/strings';
import '@testing-library/jest-dom/vitest';
import i18next from 'i18next';

i18next.init({
  lng: 'en',
  resources: {
    en: defaultLocalizationStrings.en,
    fr: defaultLocalizationStrings.fr,
  },
  interpolation: {
    prefix: '%{',
    suffix: '}',
    escapeValue: false,
  },
});
