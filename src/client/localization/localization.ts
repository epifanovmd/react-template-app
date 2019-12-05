import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import BackendExpress from "i18next-node-fs-backend";

export interface IInitLocalizationParams {
  initLang?: string;
  isServer?: boolean;
}

const LngDetector = new LanguageDetector(null, {
  caches: ["cookie"],
});

export const initLocalization = ({initLang = "en", isServer}: IInitLocalizationParams) => {
  if (isServer) {
    return i18next
      .use(BackendExpress)
      .init({
        fallbackLng: initLang,
        lng: initLang,
        interpolation: {
          escapeValue: false,
        },
        debug: IS_DEVELOPMENT,
        load: "languageOnly",
        backend: {
          loadPath: `${process.cwd()}/build/client/locales/{{lng}}/{{ns}}.json`,
          jsonIndent: 2,
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
        debug: IS_DEVELOPMENT,
        load: "languageOnly",
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: IS_SSR ? "client/locales/{{lng}}/{{ns}}.json" : "/locales/{{lng}}/{{ns}}.json",
        },
      });
  }
};
