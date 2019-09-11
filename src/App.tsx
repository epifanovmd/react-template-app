import {PopupNotification} from "./components/popupNotification/popupNotification";
import {Route} from "react-router";
import {Users} from "./modules/users/Users";
import React from "react";
import {NavLink} from "react-router-dom";

import "./assets/clearfix.scss";
import {UseFormComponent} from "./modules/useForm/UseForm";

export const Routes = (): JSX.Element => (
  <>
    <PopupNotification/>
    <ul className={"container"}>
      <li>
        <NavLink to={"/"}>{"Users"}</NavLink>
      </li>
      <li>
        <NavLink to={"/useform"}>{"UseForm"}</NavLink>
      </li>
    </ul>
    <br />

    <Route exact={true} path="/" component={Users}/>
    <Route exact={true} path="/userlist/:id" component={Users}/>
    <Route exact={true} path="/useform" component={UseFormComponent}/>
  </>
);
