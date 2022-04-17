import cookieParser from "cookie-parser";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.ssr.config";

const compiler = webpack([config[0] as any, config[1] as any]);

import { serverRenderer } from "./render";

const DEV = process.env.NODE_ENV === "development";

const app = express();

const PORT = process.env.PORT || 8080;

if (DEV) {
  (process.env as any).SSR = true;
  const devMiddleware = webpackDevMiddleware(compiler);

  app.use(devMiddleware);
  app.use(webpackHotMiddleware(compiler.compilers[0] as any));
}

app.use(express.static("build"));
app.use(cookieParser());
app.use(serverRenderer());

app.listen(PORT, () => {
  console.log(`Application listening on: http://localhost:${PORT}`);
});
