import { Popup } from "Components/popup/popup";
import { Route, Switch } from "react-router-dom";
import React, { FC, Provider } from "react";
import { routes } from "./routes";
import { Header } from "Components/layouts/header/header";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { AuthorizationMiddleware } from "./middlewares/authorization";
import { Spin } from "antd";
const Authorization = loadable(() =>
  import("./modules/authentication/authorization/Authorization"),
);
import "../../node_modules/antd/dist/antd.css";
import { ContextReactHooks } from "Components/Context/contextReactHooks";
import { StoreProvider } from "./reactHooksStore/store";
import { ContextMobx } from "Components/Context/contextMobx";

const App = () => {
  const { i18n } = useTranslation();

  return (
    <div key={i18n.language} className="container">
      <Popup />
      <Header />
      <Spin />
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
        <Route exact={true} path={"/authorization"} component={Authorization} />
        <Route exact={true} path={"/contextMobx"} component={ContextMobx} />
        <StoreProvider>
          <Route
            exact={true}
            path={"/contextReactHooks"}
            component={ContextReactHooks}
          />
        </StoreProvider>
      </Switch>
    </div>
  );
};

export default App;
