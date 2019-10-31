import {PopupNotification} from "./components/popupNotification/popupNotification";
import {Route, Switch} from "react-router";
import React from "react";
import {routes} from "./routes";
import {Header} from "./components/layouts/header/header";

export const Routes = () => (
  <>
    <PopupNotification />
    <Header />
    <br />
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} />)}
    </Switch>
  </>
);
