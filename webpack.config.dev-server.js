const path = require("path");
const webpackConfig = require("./webpack.config.base");
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const client = {
  ...webpackConfig.baseConfigClient(),
  mode: "development",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              namedExport: true,
              camelCase: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ["cover 99.5%"]
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      ...webpackConfig.baseLoaders.font,
      webpackConfig.baseLoaders.file,
    ],
  },
  plugins: [
    ...webpackConfig.basePlugins(),
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      inject: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    proxy: {
      "/api": {
        target: "https://jsonplaceholder.typicode.com/",
        pathRewrite: { "^/api": "/" },
        changeOrigin: true,
      },
    },
  },
};

module.exports = client;
