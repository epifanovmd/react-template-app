const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.base");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfigProd = env => ({
  ...webpackConfig.baseConfig,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: '/'
  },
  mode: "production",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      {
        test: /\.scss$/,
        use: [
          ...webpackConfig.baseLoaders.scss,
        ],
      },
      ...webpackConfig.baseLoaders.font,
      webpackConfig.baseLoaders.file,
    ],
  },
  plugins: [
    ...webpackConfig.basePlugins,
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});

module.exports = webpackConfigProd;
