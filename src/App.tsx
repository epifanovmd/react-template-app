import {PopupNotification} from "./components/popupNotification/popupNotification";
import {Route} from "react-router";
import {Users} from "./modules/users/Users";
import React from "react";
import {NavLink} from "react-router-dom";
import {TestForm} from "./components/forms/testForm/testForm";

import "./assets/clearfix.scss";

export const Routes = (): JSX.Element => (
  <>
    <PopupNotification/>
    <ul className={"container"}>
      <li>
        <NavLink to={"/"}>{"Users"}</NavLink>
      </li>
      <li>
        <NavLink to={"/form"}>{"Form"}</NavLink>
      </li>
    </ul>
    <br />

    <Route exact={true} path="/" component={Users}/>
    <Route exact={true} path="/form" component={TestForm}/>
  </>
);
