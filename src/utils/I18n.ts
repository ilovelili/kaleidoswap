import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import getUserLocale from 'get-user-locale'
import resources from '../locale'

const options = {
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources,
  interpolation: {
    escapeValue: false,
  },
}

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb: any) => {
    cb(getUserLocale())
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

i18n
  // @ts-ignore
  .use(languageDetector)
  .use(initReactI18next)
  .init(options)

export default i18n
