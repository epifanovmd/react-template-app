import {PopupNotification} from "./components/popupNotification/popupNotification";
import {Route} from "react-router";
import {Users} from "./modules/users/Users";
import React from "react";
import {NavLink} from "react-router-dom";

import "./assets/clearfix.scss";
import {UseFormComponent} from "./modules/useForm/UseForm";
import {TestPage} from "./modules/testPage/TestPage";
import {TestRender} from "./modules/testRender/testRender";

export const Routes = (): JSX.Element => (
  <>
    <PopupNotification/>
    <ul className={"container"}>
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
    <br />

    <Route exact={true} path="/" component={Users}/>
    <Route exact={true} path="/userlist/:id" component={Users}/>
    <Route exact={true} path="/test" component={TestPage}/>
    <Route exact={true} path="/useform" component={UseFormComponent}/>
    <Route exact={true} path="/testRender" component={TestRender}/>
  </>
);
