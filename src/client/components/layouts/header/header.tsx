import React, {FC} from "react";
import {NavLink} from "react-router-dom";

export const Header: FC = () => {

  return (
    <ul>
      <li>
        <NavLink to={"/"}>{"Users"}</NavLink>
      </li>
      <li>
        <NavLink to={"/test"}>{"Test Page"}</NavLink>
      </li>
      <li>
        <NavLink to={"/useform"}>{"UseForm"}</NavLink>
      </li>
      <li>
        <NavLink to={"/testRender"}>{"TestRender"}</NavLink>
      </li>
    </ul>
  );
};
