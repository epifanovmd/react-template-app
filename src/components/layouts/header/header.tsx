import React, { ChangeEvent, FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { routes } from "../../../routes";
import styles from "./styles.module.scss";

export const Header: FC = memo(() => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLang = async ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    await i18n.changeLanguage(value);
  };

  return (
    <div className={styles.header}>
      <menu>
        <ul className={styles.items}>
          {routes.map(({ path, pathName }) => (
            <li key={path}>
              <NavLink to={path}>{t(pathName)}</NavLink>
            </li>
          ))}
          <li>
            <select name="lang" onChange={changeLang} value={i18n.language}>
              <option value="en">En</option>
              <option value="ru">Ru</option>
            </select>
          </li>
        </ul>
      </menu>
    </div>
  );
});