import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export interface IInitLocalizationParams {
  initLang?: string;
  isServer?: boolean;
}

const LngDetector = new LanguageDetector(null, { caches: ["cookie"] });

import { enLocale } from "./locales/en";
import { ruLocale } from "./locales/ru";

export const initLocalization = ({
  initLang = "en",
  isServer,
}: IInitLocalizationParams) => {
  if (isServer) {
    return i18next.init({
      fallbackLng: initLang,
      lng: initLang,
      interpolation: {
        escapeValue: false,
        prefix: "",
      },
      debug: false,
      load: "languageOnly",
      resources: {
        en: { translation: { ...enLocale } },
        ru: { translation: { ...ruLocale } },
      },
    });
  } else {
    return i18next
      .use(LngDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: initLang,
        lng: initLang,
        debug: false,
        load: "languageOnly",
        interpolation: {
          escapeValue: false,
          prefix: "",
        },
        resources: {
          en: { translation: { ...enLocale } },
          ru: { translation: { ...ruLocale } },
        },
      });
  }
};
