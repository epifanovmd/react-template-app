import express from "express";

import React from "react";
import {renderToString} from "react-dom/server";
import {matchPath, StaticRouter} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import Helmet from "react-helmet";
import {createSimpleStore} from "../client/store/store";
import {Routes} from "../client/App";
import proxyMiddleware from "http-proxy-middleware";
import {routes} from "../client/routes";
import {SimpleDispatch, SimpleThunk} from "../client/common/simpleThunk";
import {proxy} from "../../proxy";
import {template} from "./template";
import {Request, Response} from "express-serve-static-core";

const app = express();
const port = 8080;

if (proxy) {
  Object.keys(proxy).map((context: string) => {
    app.use(proxyMiddleware(context, proxy[context]));
  });
}

app.use(express.static("build"));

app.get("/*", (req: Request, res: Response) => {
  const context = {};
  const store = createSimpleStore();
  const getData = (thunk: SimpleThunk): any => (dispatch: SimpleDispatch) => (dispatch(thunk));

  // Fetch initial data and set to store
  const dataRequirements =
    routes
      .filter(route => matchPath(req.url, route))
      .map(route => route.getInitialData &&
        store.dispatch(getData(route.getInitialData)),
      );

  Promise.all(dataRequirements).then(() => {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={req.url}>
          <Routes />
        </StaticRouter>
      </ReduxProvider>
    );
    const reactDom = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(template(reactDom, reduxState, helmetData));
  });
});

app.listen(port, () => {
  console.log("Server started on port: http://localhost:" + port);
});
