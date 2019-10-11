const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const baseConfig = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "script.js",
    publicPath: '/'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: "node_modules",
};

const baseLoaders = {
  ts: {
    test: /\.tsx?$/,
    loader: "ts-loader",
  },
  url: {
    test: /\.(pdf|jpg|png|gif|svg|ico)$/,
    loader: 'url-loader',
    options: {
      limit: 25000,
    },
  },
  file: {
    test: /\.(pdf|jpg|png|gif|svg|ico)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[hash:8].[ext]',
    },
  },
  font: [
    {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
    {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
  ],
  scss: [
    {
      loader: "css-loader",
      query: {
        modules: true,
        sourceMap: true,
        localIdentName: "[local]",
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
      },
    },
  ],
};

const basePlugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    favicon: "",
  }),
];

const webpackConfig = {
  baseConfig,
  baseLoaders,
  basePlugins,
};

module.exports = webpackConfig;
