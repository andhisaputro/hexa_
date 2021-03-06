import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)

import en from './lang/en'
import id from './lang/id'

const resources = {
  EN: {
   	translation: en, //for indonesian

  },
	ID: {
		translation: id, //for indonesian
	}
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "EN",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
