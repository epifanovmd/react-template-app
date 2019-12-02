import {PopupNotification} from "./components/popupNotification/popupNotification";
import {Route, Switch} from "react-router-dom";
import React from "react";
import {routes} from "./routes";
import {Header} from "./components/layouts/header/header";
import {useTranslation} from "react-i18next";

const Routes = () => {
  const {i18n} =  useTranslation();

    return (
      <div key={i18n.language} className="container">
          <PopupNotification />
          <Header />
          <br />
          <Switch>
              {routes.map(route => <Route key={route.path} {...route} />)}
          </Switch>
      </div>
    );
};

//tslint:disable-next-line
export default Routes;
