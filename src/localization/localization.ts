import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// @ts-ignore
import Backend from "i18next-fs-backend";
import Backend1 from "i18next-xhr-backend";
import { resolve } from "path";
import { initReactI18next } from "react-i18next";

export interface IInitLocalizationParams {
  initLang?: string;
  isServer?: boolean;
}

type IAvailableLanguages = "ru" | "en";

const LngDetector = new LanguageDetector(null, { caches: ["cookie"] });

export const initLocalization = ({
  initLang = "en",
  isServer,
}: IInitLocalizationParams) => {
  if (isServer) {
    return i18next.use<any>(Backend).init({
      fallbackLng: initLang,
      lng: initLang,
      interpolation: {
        escapeValue: false,
        prefix: "",
      },
      debug: false,
      load: "languageOnly",
      backend: {
        loadPath: resolve(__dirname, "../locales/{{lng}}/{{ns}}.json"),
        jsonIndent: 2,
      },
    });
  } else {
    return i18next
      .use(Backend1)
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
          loadPath: resolve(__dirname, "/locales/{{lng}}/{{ns}}.json"),
        },
      });
  }
};
