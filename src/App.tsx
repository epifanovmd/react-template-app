import "rc-tooltip/assets/bootstrap.css";

import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";

import { routes } from "./routes";
import { Header } from "./components";
import { Container } from "./components/layouts/container";

const App = () => {
  const { i18n } = useTranslation();

  return (
    <Container key={i18n.language}>
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
    </Container>
  );
};

export default App;
