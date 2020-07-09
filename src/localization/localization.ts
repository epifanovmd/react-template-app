import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
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
}: IInitLocalizationParams) =>
  i18next
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
