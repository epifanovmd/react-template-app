import "rc-tooltip/assets/bootstrap.css";

import { Header } from "Components/layouts/header/header";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";

import { routes } from "./routes";

const App = () => {
  const { i18n } = useTranslation();

  return (
    <div key={i18n.language} className="container">
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
