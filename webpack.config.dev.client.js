const webpack = require("webpack");
const webpackConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const client = env => ({
  ...webpackConfig.baseConfigClient(),
  mode: "production",
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
    ...webpackConfig.basePlugins(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
      ignoreOrder: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env && JSON.stringify(env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      inject: true,
    }),
  ],
});

module.exports = client;

