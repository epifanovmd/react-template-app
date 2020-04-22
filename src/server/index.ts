import cookieParser from "cookie-parser";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import proxy from "../../proxy.json";
import { serverRenderer } from "./render";

const app = express();
const port = process.env.PORT || 8080;

if (proxy) {
  Object.keys(proxy).forEach(context => {
    app.use(createProxyMiddleware(context, (proxy as any)[context]));
  });
}

app.use(express.static("build"));
app.use(cookieParser());
app.use(serverRenderer());

app.listen(port, () => {
  console.log(`Application listening on: http://localhost:${port}`);
});
