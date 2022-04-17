const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { alias, loaders, plugins, IS_PRODUCTION } = require("./webpack.common");

module.exports = {
  name: "server",
  target: "node",
  mode: IS_PRODUCTION ? "production" : "development",
  entry: {
    server: path.resolve(__dirname, "src/server/index.ts"),
  },
  output: {
    filename: "server/[name].js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    alias,
  },
  externals: [
    nodeExternals({
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],

  module: {
    rules: [
      loaders.ts,
      ...loaders.font,
      loaders.svg,
      loaders.scss,
      loaders.less,
      loaders.css,
    ],
  },
  plugins: [
    ...plugins,
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
