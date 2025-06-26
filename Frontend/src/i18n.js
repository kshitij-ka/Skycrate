import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import fr from './locales/fr.json';
// import more languages as needed

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  fr: { translation: fr },
  // add other languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    //interpolation: {
    //  escapeValue: false, // not needed for React
    //},
  });

export default i18n;

