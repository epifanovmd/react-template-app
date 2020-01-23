import express from "express";
import proxyMiddleware from "http-proxy-middleware";
import cookieParser from "cookie-parser";
import { serverRenderer } from "./render";
import proxy from "../../proxy.json";

const app = express();
const port = process.env.PORT || 8080;

if (proxy) {
  Object.keys(proxy).map((context) => {
    app.use(proxyMiddleware(context, (proxy as any)[context]));
  });
}

app.use(express.static("build"));
app.use(cookieParser());
app.use(serverRenderer());

app.listen(port, () => {
  console.log("Application listening on: http://localhost:" + port);
});
