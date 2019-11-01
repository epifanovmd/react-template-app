import {PopupNotification} from "./components/popupNotification/popupNotification";
import {Route, Switch} from "react-router-dom";
import React from "react";
import {routes} from "./routes";
import {Header} from "./components/layouts/header/header";

export const Routes = () => (
  <div className="container">
    <PopupNotification />
    <Header />
    <br />
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} />)}
    </Switch>
  </div>
);
