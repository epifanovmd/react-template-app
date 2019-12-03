const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const webpackBaseConfig = require("./webpack.config.base");
const proxy = require("./proxy");

const client = {
  ...webpackBaseConfig.baseConfigClient,
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      webpackBaseConfig.baseLoaders.ts,
      webpackBaseConfig.baseLoaders.scss,
      ...webpackBaseConfig.baseLoaders.font,
      webpackBaseConfig.baseLoaders.file,
    ],
  },
  plugins: [
    ...webpackBaseConfig.basePlugins,
    new webpack.HotModuleReplacementPlugin(),
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
  ...webpackBaseConfig.baseConfigServer,
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      webpackBaseConfig.baseLoaders.ts,
      ...webpackBaseConfig.baseLoaders.font,
      webpackBaseConfig.baseLoaders.scss_null_loader,
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
  ]
};

module.exports = process.env.SSR ? [client, server] : client;
