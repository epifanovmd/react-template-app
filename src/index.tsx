import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {store} from "./store/store";
import {createBrowserHistory} from "history";
import {Routes} from "./App";

const root = (
  <Provider store={store}>
    <>
      <Router history={createBrowserHistory()}>
        <Routes />
      </Router>
    </>
  </Provider>
);

ReactDOM.render(
  root,
  document.getElementById("root"),
);
