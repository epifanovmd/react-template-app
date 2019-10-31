import {Config} from "http-proxy-middleware";

export interface IProxy {
  [key: string]: Config;
}

export const proxy: IProxy = {
  "/api": {
    target: "https://jsonplaceholder.typicode.com/",
    pathRewrite: {"^/api": "/"},
    changeOrigin: true,
  },
};
