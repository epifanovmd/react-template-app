import React, { ChangeEvent, FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "Modules/authentication/AuthActions";
import { checkAuthorization } from "Common/checkAuthorization";
import { IAppState } from "Store/IAppState";
import { routes } from "@/routes";

export const Header: FC = memo(() => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLang = async ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    await i18n.changeLanguage(value);
  };

  const logOut = () => {
    dispatch(AuthActions.logOut());
  };
  const token = useSelector((state: IAppState) => state.auth.token);

  return (
    <div className={styles.header}>
      <menu>
        <ul className={styles.items}>
          {routes.map(({ path, pathName }) => (
            <li key={path}>
              <NavLink to={path}>{t(pathName)}</NavLink>
            </li>
          ))}
          {!checkAuthorization(token) ? (
            <li>
              <NavLink to={"/authorization"}>{t("sign_in")}</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to={"/authorization"} onClick={logOut}>
                {t("log_out")}
              </NavLink>
            </li>
          )}
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
