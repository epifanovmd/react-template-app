import { ChunkExtractor } from "@loadable/server";
import { Request, Response } from "express-serve-static-core";
import i18next from "i18next";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { I18nextProvider } from "react-i18next";
import { matchPath } from "react-router";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";

import App from "../App";
import { template } from "./template";
import { routes } from "../routes";
import { initLocalization } from "../localization";
import { enableStaticRendering } from "mobx-react-lite";
import { flatten } from "lodash";

export const serverRenderer = () => (req: Request, res: Response) => {
  const acceptLng = req.headers["accept-language"];
  const lang =
    req.cookies.i18next ||
    (acceptLng && acceptLng.split(",")[1]?.split(";")[0]) ||
    "en";

  const webStats = path.resolve("./build/loadable-stats.json");
  const webExtractor = new ChunkExtractor({
    statsFile: webStats,
    entrypoints: ["client"],
  });

  enableStaticRendering(true);

  const sheet = new ServerStyleSheet();
  const location = req.url;
  const initialData: any = {};

  // Fetch initial data and set to store
  const dataRequirements = routes
    .filter(route => matchPath(location, route.path) && route.getInitialData)
    .map(route =>
      route.getInitialData?.map(item =>
        item[1]()?.then(res => {
          initialData[item[0]] = res;

          return res;
        }),
      ),
    );

  //   checkAuthorization(req.cookies?.token)
  //     ? req.url
  //     : `/authorization?redirect=${req.url}`

  Promise.all([
    ...flatten(dataRequirements),
    initLocalization({ initLang: lang, isServer: true }),
  ]).then(() => {
    const jsx = webExtractor.collectChunks(
      <I18nextProvider i18n={i18next}>
        <StaticRouter location={location}>
          <App />
        </StaticRouter>
      </I18nextProvider>,
    );
    const reactDom = renderToString(sheet.collectStyles(jsx));
    const styles = sheet.getStyleTags();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(template(reactDom, initialData, helmetData, webExtractor, styles));
  });
};
