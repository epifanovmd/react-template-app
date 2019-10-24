import express from "express";
import path from "path";

import React from "react";
import serialize from "serialize-javascript";
import { renderToString } from "react-dom/server";
import { matchPath, StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import { routes } from "./routes";
import { createSimpleStore } from "./store/store";
import { Routes } from "./App";
import proxyMiddleware from "http-proxy-middleware";

const proxy: any = {
  "/api": {
    target: "https://jsonplaceholder.typicode.com/",
    pathRewrite: {"^/api": "/"},
    changeOrigin: true,
  },
};

const app = express();
const port = 8080;

if (proxy) {
  Object.keys(proxy).map((context: string) => {
    app.use(proxyMiddleware(context, proxy[context]));
  });
}

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req: any, res: any) => {
  const context = {};
  const store = createSimpleStore();

  const dataRequirements =
    routes
      .filter(route => matchPath(req.url, route)) // filter matching paths
      .map(route => route.component) // map to components
      .filter(comp => (comp as any).componentGetInitialData) // check if components have data requirement
      .map(comp => store.dispatch((comp as any).componentGetInitialData())); // dispatch data requirement

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

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate(reactDom, reduxState, helmetData));
  });
});

app.listen(port, () => {
  console.log("Server started on port: localhost:" + port);
});

function htmlTemplate(reactDom: any, reduxState: any, helmetData: any) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
            <link rel="stylesheet" type="text/css" href="./styles.css" />
        </head>

        <body>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${serialize(reduxState, { isJSON: true })}
            </script>
            <script src="./main.js"></script>
        </body>
        </html>
    `;
}
