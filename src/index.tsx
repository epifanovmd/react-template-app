import "./assets/global.scss";

import { loadableReady } from "@loadable/component";
import { createBrowserHistory } from "history";
import React, { Suspense } from "react";
import { Cookies } from "react-cookie";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import App from "./App";
import { initLocalization } from "./localization";

const cookie = new Cookies();
const history = createBrowserHistory();

initLocalization({ initLang: cookie.get("i18next") }).finally();

const renderApp = (Comp?: any) => {
  ReactDOM.hydrate(
    <Suspense fallback={"Loading..."}>
      <Router history={history}>
        <Comp />
      </Router>
    </Suspense>,
    document.getElementById("root"),
  );
};

loadableReady(() => {
  renderApp(App);
}).finally();

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NewApp = require("./App").default;

    renderApp(NewApp);
  });
}
