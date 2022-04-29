import "./assets/global.scss";

import { loadableReady } from "@loadable/component";
import React from "react";
import { Cookies } from "react-cookie";
import { createRoot, hydrateRoot, Root } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { initLocalization } from "./localization";

const cookie = new Cookies();

initLocalization({ initLang: cookie.get("i18next") }).finally();

const getApp = (Comp?: any) => (
  <BrowserRouter>
    <Comp />
  </BrowserRouter>
);

const start = () => {
  const container = document.getElementById("root")!;

  if (IS_SSR && typeof window === "object") {
    return hydrateRoot(container, getApp(App));
  } else {
    const root = createRoot(container);

    root.render(getApp(App));

    return root;
  }
};

let updateApp: Root | null = null;

loadableReady(() => {
  updateApp = start();
}).finally();

if ((module as any).hot && updateApp) {
  (module as any).hot.accept("./App", () => {
    const NewApp = require("./App").default;

    updateApp?.render(getApp(NewApp));
  });
}
