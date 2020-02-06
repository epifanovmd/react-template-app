import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { loadableReady } from "@loadable/component";
import App from "./App";
import { createSimpleStore } from "Store/store";
import "./assets/global.module.scss";
import { initLocalization } from "./localization/localization";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
const history = createBrowserHistory();

initLocalization({ initLang: cookie.get("i18next") }).finally();
export const store = createSimpleStore({
  ...window.REDUX_DATA,
  auth: { token: cookie.get("token") },
});

const renderMethod =
  typeof window === "undefined" ? ReactDOM.hydrate : ReactDOM.render;

const renderApp = (Comp?: any) => {
  renderMethod(
    <Provider store={store}>
      <Suspense fallback={"Loading..."}>
        <Router history={history}>
          <Comp />
        </Router>
      </Suspense>
    </Provider>,
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
