const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_SSR = process.env.SSR;

const alias = {
  "@": path.resolve(__dirname, `src/client`),
  Store: path.resolve(__dirname, `src/client/store`),
  Api: path.resolve(__dirname, `src/client/api`),
  Modules: path.resolve(__dirname, `src/client/modules`),
  Common: path.resolve(__dirname, `src/client/common`),
  Components: path.resolve(__dirname, `src/client/components`),
};

const baseConfigClient = {
  name: "client",
  target: "web",
  entry: {
    client: path.resolve(__dirname, "src/client/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: IS_SSR
      ? IS_PRODUCTION
        ? "client/[contenthash].js"
        : "client/[name].js"
      : IS_PRODUCTION
        ? "[contenthash].js"
        : "[name].js",
    chunkFilename: IS_SSR
      ? IS_PRODUCTION
        ? "client/[contenthash].chunk.js"
        : "client/[name].chunk.js"
      : IS_PRODUCTION
        ? "[contenthash].chunk.js"
        : "[name].chunk.js",
    publicPath: "/",
  },
  node: {
    fs: "empty",
    net: "empty",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    alias
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
    alias
  },
  externals: [nodeExternals()],
};

const baseLoaders = {
  ts: {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: ["babel-loader", "ts-loader"],
  },
  url: {
    test: /\.(pdf|jpg|png|gif|svg|ico)$/,
    loader: "url-loader",
    options: {
      limit: 25000,
      name: "[path][name].[hash:8].[ext]",
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
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader?mimetype=application/font-woff",
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader?mimetype=application/font-woff",
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader?mimetype=application/octet-stream",
    },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
  ],
  scss: {
    test: /\.(sa|sc)ss$/,
    use: [
      {
        loader: IS_PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[local]--[hash:base64:5]",
          },
          sourceMap: true,
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
  less: {
    test: /\.less$/,
    use: [
      {
        loader: IS_PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
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
        loader: "less-loader", // compiles Less to CSS,
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  },
  css: {
    test: /\.css$/,
    use: [
      {
        loader: IS_PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
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
    ],
  },
  scss_null_loader: {
    test: /\.(sa|sc|c)ss$/,
    loader: "null-loader",
  },
};

const basePlugins = [
  ...(IS_PRODUCTION
    ? [
      new MiniCssExtractPlugin({
        filename: IS_SSR
          ? "client/styles/[contenthash].css"
          : "styles/[contenthash].css",
        chunkFilename: IS_SSR
          ? "client/styles/[contenthash].chunk.css"
          : "styles/[contenthash].chunk.css",
        ignoreOrder: false,
      }),
    ]
    : []),
  ...(!IS_SSR ? [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
  ] : []),
  new webpack.DefinePlugin({
    "process.env.SSR": JSON.stringify(process.env.SSR),
    IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
    IS_PRODUCTION: JSON.stringify(IS_PRODUCTION),
    IS_SSR: JSON.stringify(IS_SSR),
    "process.env.PORT": JSON.stringify(process.env.PORT),
  }),
];

module.exports = {
  baseConfigClient,
  baseConfigServer,
  baseLoaders,
  basePlugins,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  IS_SSR,
};
