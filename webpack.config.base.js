const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const ManifestPlugin = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfigClient = {
  name: "client",
  target: "web",
  entry: {
    client: path.resolve(__dirname, "src/client/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: process.env.SSR ? "client/[name].js" : "[name].js",
    chunkFilename: process.env.SSR ? "client/[name].chunk.js" : "[name].chunk.js",
    publicPath: "/",
  },
  node: {
    fs: "empty",
    net: "empty",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: "node_modules",
};

const baseConfigServer = {
  name: "server",
  target: "node",
  entry: {
    server: path.resolve(__dirname, "src/server/index.ts"),
  },
  output: {
    filename: "server/[name].js",
    path: path.resolve(__dirname, "build"),
  },
  node: {
    fs: "empty",
    net: "empty",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: [nodeExternals()],
};

const baseLoaders = {
  ts: {
    test: /\.tsx?$/,
    loader: "ts-loader",
  },
  url: {
    test: /\.(pdf|jpg|png|gif|svg|ico)$/,
    loader: "url-loader",
    options: {
      limit: 25000,
    },
  },
  file: {
    test: /\.(pdf|jpg|png|gif|svg|ico)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[hash:8].[ext]",
    },
  },
  font: [
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
  ],
  scss: {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: "typings-for-css-modules-loader",
        options: {
          modules: true,
          localIdentName: "[local]--[hash:base64:5]",
          namedExport: true,
          camelCase: true,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ["cover 99.5%"],
            }),
          ],
          sourceMap: true,
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  scss_null_loader: {
    test: /\.(sa|sc|c)ss$/,
    loader: "null-loader",
  },
};

const basePlugins = [
  new ManifestPlugin({
    fileName: "asset-manifest.json",
  }),
  new MiniCssExtractPlugin({
    filename: process.env.SSR ? "client/styles/[name].css" : "styles/[name].css",
    chunkFilename: process.env.SSR ? "client/styles/[id].css" : "styles/[id].css",
    ignoreOrder: false,
  }),
  new CopyPlugin([
    { from: "public", to: process.env.SSR ? "client" : "", ignore: process.env.SSR ? ["*.html"] : [] },
  ]),
  new webpack.DefinePlugin({
    "process.env.SSR": process.env.SSR,
  }),
];

module.exports = {
  baseConfigClient,
  baseConfigServer,
  baseLoaders,
  basePlugins,
};
