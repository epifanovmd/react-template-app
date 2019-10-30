import express from "express";

import React from "react";
import serialize from "serialize-javascript";
import {renderToString} from "react-dom/server";
import {matchPath, StaticRouter} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import Helmet from "react-helmet";
import {createSimpleStore} from "./store/store";
import {Routes} from "./App";
import proxyMiddleware from "http-proxy-middleware";
import {routes} from "./routes";
import {SimpleDispatch, SimpleThunk} from "./common/simpleThunk";
import {proxy} from "../proxy";

const app = express();
const port = 8080;

if (proxy) {
  Object.keys(proxy).map((context: string) => {
    app.use(proxyMiddleware(context, proxy[context]));
  });
}

app.use(express.static("build"));

app.get("/*", (req: any, res: any) => {
  const context = {};
  const store = createSimpleStore();

  const getData = (thunk: SimpleThunk): any => (dispatch: SimpleDispatch) => (dispatch(thunk));

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
    res.end(htmlTemplate(reactDom, reduxState, helmetData));
  });
});

app.listen(port, () => {
  console.log("Server started on port: http://localhost:" + port);
});

function htmlTemplate(reactDom: any, reduxState: any, helmetData: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" href="/client/manifest.json">
  <link rel="shortcut icon" href="/client/favicon.ico">
  ${helmetData.title.toString()}
  ${helmetData.meta.toString()}
  <title>React SSR</title>
  <link rel="stylesheet" type="text/css" href="./client/styles/client.css" />
</head>

<body>
<div id="root">${reactDom}</div>
<script>
  window.REDUX_DATA = ${serialize(reduxState, {isJSON: true})}
</script>
<script src="./client/client.js"></script>
</body>
</html>
    `;
}
