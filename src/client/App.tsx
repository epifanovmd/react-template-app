import { PopupNotification } from "./components/popupNotification/popupNotification";
import { Route, Switch } from "react-router-dom";
import React, { FC } from "react";
import { routes } from "./routes";
import { Header } from "./components/layouts/header/header";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { AuthorizationMiddleware } from "./middlewares/authorization";
const Authorization = loadable(() =>
  import("./modules/authentication/authorization/Authorization"),
);

const App = () => {
  const { i18n } = useTranslation();

  return (
    <div key={i18n.language} className="container">
      <PopupNotification />
      <Header />
      <br />
      <Switch>
        {routes.map((route) => (
          <Route
            {...route}
            key={route.path}
            component={AuthorizationMiddleware(route.component)}
          />
        ))}
        <Route exact={true} path={"/authorization"} component={Authorization} />
      </Switch>
    </div>
  );
};

export default App;
