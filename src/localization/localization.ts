import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// @ts-ignore
import BackendExpress from "i18next-node-fs-backend";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

import englishTranslation from "./locales/en/translation.json";
import russianTranslation from "./locales/ru/translation.json";

export interface IInitLocalizationParams {
  initLang?: string;
  isServer?: boolean;
}

type IAvailableLanguages = "ru" | "en";

const LngDetector = new LanguageDetector(null, { caches: ["cookie"] });

const translations = {
  ru: russianTranslation,
  en: englishTranslation,
};

export const initLocalization = ({
  initLang = "en",
  isServer,
}: IInitLocalizationParams) => {
  if (isServer) {
    return i18next.use(BackendExpress).init({
      fallbackLng: initLang,
      lng: initLang,
      interpolation: {
        escapeValue: false,
        prefix: "",
      },
      debug: false,
      load: "languageOnly",
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    });
  } else {
    return i18next
      .use(Backend)
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
        backend: {
          loadPath(language: IAvailableLanguages) {
            return translations[language];
          },
        },
      });
  }
};
