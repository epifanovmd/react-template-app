const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const {
  alias,
  loaders,
  plugins,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
} = require("./webpack.common");

const proxy = require("./proxy.json");

module.exports = {
  name: "client",
  target: "web",
  mode: IS_PRODUCTION ? "production" : "development",
  entry: {
    client: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: IS_PRODUCTION ? "[contenthash].js" : "[name].js",
    chunkFilename: IS_PRODUCTION ? "[contenthash].chunk.js" : "[name].chunk.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: "node_modules",

  module: {
    rules: [
      loaders().ts,
      loaders().scss,
      loaders().less,
      loaders().css,
      loaders().svg,
      ...loaders().font,
      loaders().file,
      loaders().locales,
    ],
  },
  plugins: [
    ...plugins(),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
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
      }),
    ],
  },
};
