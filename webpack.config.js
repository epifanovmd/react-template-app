const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpackBaseConfig = require("./webpack.config.base");
const proxy = require("./proxy");

const {
  baseConfigClient,
  baseLoaders,
  basePlugins,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
} = webpackBaseConfig;

const client = {
  ...baseConfigClient,
  mode: IS_PRODUCTION ? "production" : "development",
  module: {
    rules: [
      baseLoaders.ts,
      baseLoaders.scss,
      baseLoaders.less,
      baseLoaders.css,
      baseLoaders.locales,
      ...baseLoaders.font,
      baseLoaders.file,
      baseLoaders.svg,
    ],
  },
  plugins: [
    ...basePlugins,
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    new CopyPlugin([{ from: "public", to: "", ignore: ["*.html"] }]),
    new LoadablePlugin(),
    new webpack.NamedModulesPlugin(),
    ...(IS_DEVELOPMENT ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    overlay: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    noInfo: false,
    proxy,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
};

module.exports = client;
