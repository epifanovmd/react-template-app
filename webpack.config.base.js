const webpack = require("webpack");
const path = require("path");
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfigClient = (env) => ({
  name: "client",
  target: "web",
  entry: {
    client: path.resolve(__dirname, "src/client/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: env.SSR ? 'client/[name].js' : '[name].js',
    chunkFilename: env.SSR ? 'client/[name].chunk.js' : '[name].chunk.js',
    publicPath: '/'
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: "node_modules",
});

const baseConfigServer = () => ({
  name: "server",
  target: "node",
  entry: {
    server: path.resolve(__dirname, "src/server/index.ts"),
  },
  output: {
    filename: "server/[name].js",
    path: path.resolve(__dirname, "build")
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: [nodeExternals()],
});

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
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
  ],
  scss: [
    {
      loader: "typings-for-css-modules-loader",
      options: {
        modules: true,
        localIdentName: '[local]--[hash:base64:5]',
        namedExport: true,
        camelCase: true
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
};

const basePlugins = (env) => ([
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
  }),
  new MiniCssExtractPlugin({
    filename: env.SSR ? 'client/styles/[name].css' : 'styles/[name].css',
    chunkFilename: env.SSR ? 'client/styles/[id].css' : 'styles/[id].css',
    ignoreOrder: false,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': env && JSON.stringify(env.NODE_ENV),
    'process.env.SSR': env && JSON.stringify(env.SSR),
    'process.env.PORT': env && JSON.stringify(env.PORT),
  }),
  new CopyPlugin([
    { from: 'public', to: env.SSR ? "client" : "", ignore: env.SSR ? ['*.html'] : [], },
  ]),
]);


const webpackBaseConfig = {
  baseConfigClient,
  baseConfigServer,
  baseLoaders,
  basePlugins,
};

module.exports = webpackBaseConfig;
