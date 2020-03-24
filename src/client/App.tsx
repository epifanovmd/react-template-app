import { Popup } from "Components/popup/popup";
import { Route, Switch } from "react-router-dom";
import React from "react";
import { routes } from "./routes";
import { Header } from "Components/layouts/header/header";
import { useTranslation } from "react-i18next";
import "../../node_modules/antd/dist/antd.css";

const App = () => {
  const { i18n } = useTranslation();

  return (
    <div key={i18n.language} className="container">
      <Popup />
      <Header />
      <br />
      <Switch>
        {routes.map((route) => (
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
