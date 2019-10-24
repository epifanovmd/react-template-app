import {PopupNotification} from "./components/popupNotification/popupNotification";
import {Route, Switch} from "react-router";
import React from "react";
import {NavLink} from "react-router-dom";
import {routes} from "./routes";

export const Routes = () => (
  <>
    <PopupNotification />
    <ul>
      <li>
        <NavLink to={"/"}>{"Users1"}</NavLink>
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
    <Switch>
      { routes.map( route => <Route key={ route.path } { ...route } /> ) }
    </Switch>
  </>
);
