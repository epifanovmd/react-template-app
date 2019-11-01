import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {Routes} from "./App";
import {createSimpleStore} from "./store/store";
import "./assets/global.scss";

const store = createSimpleStore(window.REDUX_DATA);

const root = (
  <Provider store={store}>
    <div>
      <Router history={createBrowserHistory()}>
        <Routes />
      </Router>
    </div>
  </Provider>
);

const renderMethod = typeof document === "undefined" ?
  ReactDOM.hydrate :
  ReactDOM.render;
renderMethod(
  root,
  document.getElementById("root"),
);
