import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {Routes} from "./App";
import {createSimpleStore} from "./store/store";

const store = createSimpleStore(window.REDUX_DATA);

const root = (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Routes />
    </Router>
  </Provider>
);

ReactDOM.hydrate(
  root,
  document.getElementById("root"),
);
