import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {Routes} from "./App";
import {createSimpleStore} from "./store/store";
import "./assets/global.scss";
import {initLocalization} from "./localization/localization";
import {Cookies} from "react-cookie";

const cookie = new Cookies();

initLocalization({initLang: cookie.get("i18next")});
const store = createSimpleStore(window.REDUX_DATA);

const root = (
  <Provider store={store}>
    <Suspense fallback={"Loading lang"}>
      <Router history={createBrowserHistory()}>
        <Routes />
      </Router>
    </Suspense>
  </Provider>
);

const renderMethod = typeof document === "undefined" ?
  ReactDOM.hydrate :
  ReactDOM.render;
renderMethod(
  root,
  document.getElementById("root"),
);
