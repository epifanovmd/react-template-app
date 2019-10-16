const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const browserList = require('./package');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
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
      loader: "style-loader",
    },
    {
      loader: "css-loader",
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: browserList.browserslist
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
};

const basePlugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
    inject: true,
  }),
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
  }),
  new CopyPlugin([
    { from: 'public' },
  ]),
];

const webpackConfig = {
  baseConfig,
  baseLoaders,
  basePlugins,
};

module.exports = webpackConfig;
