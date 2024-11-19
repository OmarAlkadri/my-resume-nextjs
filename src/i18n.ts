import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translationEN } from '@/assets/languages/en_lang'
import { translationAR } from '@/assets/languages/ar_lang'
import { translationTR } from '@/assets/languages/tr_lang'

const resources = {
  tr: { translation: translationTR },
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n