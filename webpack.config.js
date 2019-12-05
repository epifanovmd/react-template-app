const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const LoadablePlugin = require('@loadable/webpack-plugin');
const ManifestPlugin = require("webpack-manifest-plugin");
const webpackBaseConfig = require("./webpack.config.base");
const proxy = require("./proxy");

const {
  baseConfigClient,
  baseConfigServer,
  baseLoaders,
  basePlugins,
  IS_SERVER,
  IS_CLIENT,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  IS_SSR,
} = webpackBaseConfig;

const client = {
  ...baseConfigClient,
  mode: IS_PRODUCTION ? "production" : "development",
  module: {
    rules: [
      baseLoaders.ts,
      baseLoaders.scss,
      ...baseLoaders.font,
      baseLoaders.file,
    ],
  },
  plugins: [
    ...basePlugins,
    new ManifestPlugin({
      fileName: "client/asset-manifest.json",
    }),
    new CopyPlugin([
      { from: "public", to: IS_SSR ? "client" : "", ignore: IS_SSR ? ["*.html"] : [] },
    ]),
    new LoadablePlugin(),
    new webpack.NamedModulesPlugin(),
    ...(IS_DEVELOPMENT ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    proxy: proxy,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true
      }),
    ],
  }
};

const server = {
  ...baseConfigServer,
  mode: IS_PRODUCTION ? "production" : "development",
  module: {
    rules: [
      baseLoaders.ts,
      ...baseLoaders.font,
      baseLoaders.scss_null_loader,
    ],
  },
  plugins: [
    ...basePlugins,
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
  ]
};

module.exports = IS_SSR ? [client, server] : client;
