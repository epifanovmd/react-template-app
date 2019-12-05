import {Request, Response} from "express-serve-static-core";
import {createSimpleStore} from "../client/store/store";
import {SimpleDispatch, SimpleThunk} from "../client/common/simpleThunk";
import {routes} from "../client/routes";
import {initLocalization} from "../client/localization/localization";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import {Provider as ReduxProvider} from "react-redux";
import App from "../client/App";
import {renderToString} from "react-dom/server";
import Helmet from "react-helmet";
import {template} from "./template";
import React from "react";
import {StaticRouter} from "react-router-dom";
import {matchPath} from "react-router";
import path from "path";
import { ChunkExtractor } from "@loadable/server";

export const serverRenderer = () => (req: Request, res: Response) => {
  const acceptLng = req.headers["accept-language"];
  const lang = req.cookies.i18next || (acceptLng && acceptLng.split(",")[1].split(";")[0]) || "en";
  const context = {};
  const store = createSimpleStore();
  const getData = (thunk: SimpleThunk): any => (dispatch: SimpleDispatch) => (dispatch(thunk));

  const webStats = path.resolve("./build/loadable-stats.json");
  const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: ["client"] });

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
    const jsx = webExtractor.collectChunks(
      <I18nextProvider i18n={i18next}>
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      </I18nextProvider>,
    );
    const reactDom = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(template(reactDom, reduxState, helmetData, webExtractor));
  });
};
