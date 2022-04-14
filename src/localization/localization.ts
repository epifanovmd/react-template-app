import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const LngDetector = new LanguageDetector(null, { caches: ["cookie"] });

import { ruLocale } from "./locales";

export type ILanguageType = "ru";

export const langResources = {
  ru: { translation: { ...ruLocale } },
};

export interface IInitLocalizationParams {
  initLang?: string;
  isServer?: boolean;
}

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
      resources: langResources,
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
        resources: langResources,
      });
  }
};
