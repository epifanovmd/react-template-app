import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export interface IInitLocalizationParams {
  initLang?: string;
  isServer?: boolean;
}

const LngDetector = new LanguageDetector(null, {
  caches: ["cookie"],
});

export const initLocalization = ({
  initLang = "en",
}: IInitLocalizationParams) => {
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
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    });
};
