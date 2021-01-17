const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpackBaseConfig = require("./webpack.config.base");
const proxy = require("./proxy");

const {
  baseConfigClient,
  baseConfigServer,
  baseLoaders,
  basePlugins,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  IS_SSR,
} = webpackBaseConfig;

const client = {
  ...baseConfigClient,
  mode: IS_PRODUCTION ? "production" : "development",
  module: {
    rules: [
      baseLoaders.scss,
      baseLoaders.ts,
      baseLoaders.less,
      baseLoaders.css,
      baseLoaders.svg,
      ...baseLoaders.font,
      baseLoaders.file,
      baseLoaders.locales,
    ],
  },
  plugins: [
    ...basePlugins,
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
    new LoadablePlugin(),
    new webpack.NamedModulesPlugin(),
    ...(IS_DEVELOPMENT ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    overlay: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    noInfo: false,
    proxy,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};

const server = {
  ...baseConfigServer,
  mode: IS_PRODUCTION ? "production" : "development",
  module: {
    rules: [
      baseLoaders.ts,
      ...baseLoaders.font,
      baseLoaders.scss,
      baseLoaders.less,
      baseLoaders.css,
    ],
  },
  plugins: [
    ...basePlugins,
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

module.exports = IS_SSR ? [client, server] : client;
