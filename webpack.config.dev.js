const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.base");
const nodeExternals = require("webpack-node-externals");

const webpackConfigDev = {
  ...webpackConfig.baseConfig,
  mode: "development",
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
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: true,
    noInfo: false,
    proxy: {
      "/users": {
        target: "https://jsonplaceholder.typicode.com/",
        changeOrigin: true,
      },
    },
  },
};

var server = {
  name: "server",
  target: "node",
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, "src/server.tsx"),
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build")
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  mode: "development",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      // {
      //   test: /\.scss$/,
      //   use: [
      //     ...webpackConfig.baseLoaders.scss,
      //   ],
      // },
      // ...webpackConfig.baseLoaders.font,
      // webpackConfig.baseLoaders.file,
    ],
  },
}

module.exports = [webpackConfigDev, server];
