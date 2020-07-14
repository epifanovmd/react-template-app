import React, { ChangeEvent, FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { routes } from "../../../routes";

export const Header: FC = memo(() => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLang = async ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    await i18n.changeLanguage(value);
  };

  return (
    <HeaderWrap>
      <menu>
        <Items>
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
        </Items>
      </menu>
    </HeaderWrap>
  );
});

const HeaderWrap = styled.div`
  li {
    list-style-type: none;
    &:not(:first-of-type):not(:last-of-type) {
      margin: 0 5px 0 5px;
    }
  }
`;

const Items = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;
