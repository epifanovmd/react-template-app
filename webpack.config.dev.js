const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const client = env => ({
  ...webpackConfig.baseConfigClient,
  mode: "development",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          ...webpackConfig.baseLoaders.scss
        ],
      },
      ...webpackConfig.baseLoaders.font,
      webpackConfig.baseLoaders.file,
    ],
  },
  plugins: [
    ...webpackConfig.basePlugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env && JSON.stringify(env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: 'client/styles/[name].css',
      chunkFilename: 'client/styles/[id].css',
      ignoreOrder: false,
    }),
  ],
};

const server = {
  ...webpackConfig.baseConfigServer,
  mode: "development",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "isomorphic-style-loader",
          },
          ...webpackConfig.baseLoaders.scss
        ],
      },
    ],
  },
});

module.exports = [client, server];
