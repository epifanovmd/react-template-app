import {ruDictionary} from "./langs/ru";
import {enDictionary} from "./langs/en";
import LocalizedStrings from "react-localization";

export const localization = new LocalizedStrings({
  ru: ruDictionary,
  en: enDictionary,
});
localization.setLanguage("ru");
