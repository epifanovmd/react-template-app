const webpack = require("webpack");
const webpackBaseConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const client = env => ({
  ...webpackBaseConfig.baseConfigClient(env),
  mode: "development",
  module: {
    rules: [
      webpackBaseConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          ...webpackBaseConfig.baseLoaders.scss
        ],
      },
      ...webpackBaseConfig.baseLoaders.font,
      webpackBaseConfig.baseLoaders.file,
    ],
  },
  plugins: [
    ...webpackBaseConfig.basePlugins(env),
    new webpack.HotModuleReplacementPlugin(),
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
});

const server = (env) => ({
  ...webpackBaseConfig.baseConfigServer(env),
  mode: "development",
  module: {
    rules: [
      webpackBaseConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "isomorphic-style-loader",
          },
          ...webpackBaseConfig.baseLoaders.scss
        ],
      },
    ],
  },
});

module.exports = (env) => {
  if (env.SSR) {
    return [client(env), server(env)];
  } else return client(env);
};
