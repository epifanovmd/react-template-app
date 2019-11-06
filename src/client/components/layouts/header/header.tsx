import React, {ChangeEvent, FC} from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Header: FC = () => {

  const {t, i18n} = useTranslation();

  const changeLang = async ({target: {value}}: ChangeEvent<HTMLSelectElement>) => {
    await i18n.changeLanguage(value);
  };

  return (
    <div>
      <menu>
        <ul>
          <li>
            <NavLink to={"/"}>{t("users")}</NavLink>
          </li>
          <li>
            <NavLink to={"/test"}>{t("test-page")}</NavLink>
          </li>
          <li>
            <NavLink to={"/useform"}>{t("use-form")}</NavLink>
          </li>
          <li>
            <NavLink to={"/testRender"}>{t("test-render")}</NavLink>
          </li>
        </ul>
      </menu>
      <div>
        <select name="lang" onChange={changeLang} value={i18n.language}>
          <option value="en">En</option>
          <option value="ru">Ru</option>
        </select>
      </div>
    </div>
  );
};
