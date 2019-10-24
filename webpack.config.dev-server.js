const path = require("path");
const nodeExternals = require("webpack-node-externals");

const webpackConfigDev = {
  name: "server",
  target: "node",
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, "src/server.tsx"),
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist")
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
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
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


module.exports = webpackConfigDev;
