import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import globalEN from "@assets/locales/en.json";
import globalFR from "@assets/locales/fr.json";
import authEN from "@domains/auth/assets/locales/en.json";
import authFR from "@domains/auth/assets/locales/fr.json";
import dashboardEN from "@domains/dashboard/assets/locales/fr.json";
import dashboardFR from "@domains/dashboard/assets/locales/fr.json";
import userEN from "@domains/user/assets/locales/fr.json";
import userFR from "@domains/user/assets/locales/fr.json";

/**
 * Locales files
 * <domain> : file
 */
const resources = {
  en: {
    translation: {
      global: globalEN,
      auth: authEN,
      dashboard: dashboardEN,
      user: userEN,
    },
  },
  fr: {
    translation: {
      global: globalFR,
      auth: authFR,
      dashboard: dashboardFR,
      user: userFR,
    },
  },
};

/**
 * Example : to change language
 * const {
 *   i18n: { language, changeLanguage },
 * } = useTranslation();
 *
 * () => changeLanguage("en");
 * console.log("current language: " + language);
 */

/**
 * i18next initialisation
 */
i18n.use(initReactI18next).init({
  // if you want force a language, replace navigator.language.split("-")[0] by "en" / "fr" ..
  lng: "en", //TODO adapter to the use : navigator.language.split("-")[0],
  compatibilityJSON: "v3",
  fallbackLng: "en",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

/**
 * Get translation without hook
 * @param key
 */
const getTranslation = (key: string) => i18n.t(key);

export { getTranslation, i18n };
