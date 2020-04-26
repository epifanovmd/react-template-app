import { ChunkExtractor } from "@loadable/server";
import { AsyncThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IResponse } from "Api/baseFetch";
import { checkAuthorization } from "Common/checkAuthorization";
import { Request, Response } from "express-serve-static-core";
import i18next from "i18next";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { I18nextProvider } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { matchPath } from "react-router";
import { StaticRouter } from "react-router-dom";
import { Action } from "redux";
import { IAppState } from "Store/IAppState";
import { createSimpleStore, IExtraArguments } from "Store/store";
import { ServerStyleSheet } from "styled-components";

import { initLocalization } from "@/localization/localization";
import { routes } from "@/routes";

import App from "../App";
import { template } from "./template";

export const serverRenderer = () => (req: Request, res: Response) => {
  const acceptLng = req.headers["accept-language"];
  const lang =
    req.cookies.i18next ||
    (acceptLng && acceptLng.split(",")[1].split(";")[0]) ||
    "en";
  const context = {};
  const store = createSimpleStore();
  const getData = (
    thunk: AsyncThunkAction<
      IResponse<any>,
      any,
      {
        dispatch: ThunkDispatch<IAppState, IExtraArguments, Action>;
        state: IAppState;
        extra: IExtraArguments;
      }
    >,
  ) => (dispatch: ThunkDispatch<IAppState, IExtraArguments, Action>) =>
    dispatch(thunk);

  const webStats = path.resolve("./build/loadable-stats.json");
  const webExtractor = new ChunkExtractor({
    statsFile: webStats,
    entrypoints: ["client"],
  });

  const sheet = new ServerStyleSheet();

  // Fetch initial data and set to store
  const dataRequirements = routes
    .filter(route => matchPath(req.url, route) && route.getInitialData)
    .map(
      route =>
        route.getInitialData && store.dispatch(getData(route.getInitialData)),
    );
  const location = req.url;
  //   checkAuthorization(req.cookies?.token)
  //     ? req.url
  //     : `/authorization?redirect=${req.url}`

  Promise.all([
    ...dataRequirements,
    initLocalization({ initLang: lang, isServer: true }),
  ]).then(() => {
    const jsx = webExtractor.collectChunks(
      <I18nextProvider i18n={i18next}>
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={location}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      </I18nextProvider>,
    );
    const reactDom = renderToString(sheet.collectStyles(jsx));
    const styles = sheet.getStyleTags();
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(template(reactDom, reduxState, helmetData, webExtractor, styles));
  });
};
