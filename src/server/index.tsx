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
import i18next from "i18next";
import {initLocalization} from "../client/localization/localization";
import {I18nextProvider} from "react-i18next";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8080;

if (proxy) {
  Object.keys(proxy).map((context: string) => {
    app.use(proxyMiddleware(context, proxy[context]));
  });
}

app.use(express.static("build"));
app.use(cookieParser());

app.get("/*", (req: Request, res: Response) => {
  const acceptLng = req.headers["accept-language"];
  const lang = req.cookies.i18next || (acceptLng && acceptLng.split(",")[1].split(";")[0]) || "en";
  const context = {};
  const store = createSimpleStore();
  const getData = (thunk: SimpleThunk): any => (dispatch: SimpleDispatch) => (dispatch(thunk));

  // Fetch initial data and set to store
  const dataRequirements =
    routes
      .filter(route => matchPath(req.url, route) && route.getInitialData)
      .map(route => route.getInitialData && store.dispatch(getData(route.getInitialData)),
      );

  Promise.all([
    ...dataRequirements,
    initLocalization({initLang: lang, isServer: true}),
  ]).then(() => {
    const jsx = (
      <I18nextProvider i18n={i18next}>
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={req.url}>
            <Routes />
          </StaticRouter>
        </ReduxProvider>
      </I18nextProvider>
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
