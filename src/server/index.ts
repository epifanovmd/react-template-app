import express from "express";
import proxyMiddleware from "http-proxy-middleware";
import {proxy} from "../../proxy";
import cookieParser from "cookie-parser";
import {serverSideRender} from "./render";

const app = express();
const port = process.env.PORT || 8080;

if (proxy) {
  Object.keys(proxy).map((context: string) => {
    app.use(proxyMiddleware(context, proxy[context]));
  });
}

app.use(express.static("build"));
app.use(cookieParser());
app.use(serverSideRender);

app.listen(port, () => {
  console.log("Server started on port: http://localhost:" + port);
});
