const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const {
  alias,
  loaders,
  plugins,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
} = require("./webpack.common");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const proxy = require("./proxy.json");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = [
  {
    name: "client",
    target: "web",
    mode: IS_PRODUCTION ? "production" : "development",
    entry: {
      client: IS_DEVELOPMENT
        ? ["webpack-hot-middleware/client", "./src/index.tsx"]
        : "./src/index.tsx",
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: IS_PRODUCTION ? "[contenthash].js" : "[name].js",
      chunkFilename: IS_PRODUCTION
        ? "[contenthash].chunk.js"
        : "[name].chunk.js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss"],
      alias,
    },
    externals: "node_modules",

    module: {
      rules: [
        loaders(true).ts,
        loaders(true).scss,
        loaders(true).less,
        loaders(true).css,
        loaders(true).svg,
        ...loaders(true).font,
        loaders(true).file,
        loaders(true).locales,
      ],
    },
    plugins: [
      ...plugins(true),
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
  },
  {
    name: "server",
    target: "node",
    mode: IS_PRODUCTION ? "production" : "development",
    entry: {
      server: "./src/server/index.ts",
    },
    output: {
      filename: "server/[name].js",
      path: path.resolve(__dirname, "build"),
      libraryTarget: "umd",
      globalObject: "this",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss"],
      alias,
    },
    externals: [
      nodeExternals({
        whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
      }),
    ],

    module: {
      rules: [
        loaders(true).ts,
        loaders(true).scss,
        loaders(true).less,
        loaders(true).css,
        loaders(true).svg,
        ...loaders(true).font,
      ],
    },
    plugins: [
      ...plugins(true),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
];
