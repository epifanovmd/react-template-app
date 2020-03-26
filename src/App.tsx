import "antd/dist/antd.css";

import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components/layouts/header/header";
import { Popup } from "./components/popup/popup";
import { routes } from "./routes";

const App = () => {
  const { i18n } = useTranslation();

  return (
    <div key={i18n.language} className="container">
      <Popup />
      <Header />
      <br />
      <Switch>
        {routes.map(route => (
          <Route
            {...route}
            key={route.path}
            // component={AuthorizationMiddleware(route.component)}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  );
};

export default App;
