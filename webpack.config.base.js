const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_SSR = process.env.SSR;

const alias = {
  "react-dom": "@hot-loader/react-dom",
  "@": path.resolve(__dirname, "src/"),
  Store: path.resolve(__dirname, "src/store"),
  Api: path.resolve(__dirname, "src/api"),
  Modules: path.resolve(__dirname, "src/modules"),
  Common: path.resolve(__dirname, "src/common"),
  Components: path.resolve(__dirname, "src/components"),
};

const baseConfigClient = {
  name: "client",
  target: "web",
  entry: {
    client: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: IS_PRODUCTION ? "[contenthash].js" : "[name].js",
    chunkFilename: IS_PRODUCTION ? "[contenthash].chunk.js" : "[name].chunk.js",
    publicPath: "/",
  },
  node: {
    fs: "empty",
    net: "empty",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    alias,
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
    alias,
  },
  externals: [nodeExternals()],
};

const baseLoaders = {
  ts: {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      { loader: "babel-loader" },
      { loader: "cache-loader" },
      {
        loader: "thread-loader",
        options: {
          workers: require("os").cpus().length - 1,
        },
      },
      {
        loader: "ts-loader",
        options: {
          // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
          happyPackMode: true,
        },
      },
      {
        loader: "eslint-loader",
        options: {
          cache: true,
          emitWarning: true,
        },
      },
    ],
  },
  url: {
    test: /\.(pdf|jpg|png|gif|ico)$/,
    loader: "url-loader",
    options: {
      limit: 25000,
      name: "[path][name].[hash:8].[ext]",
    },
  },
  svg: {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  },
  file: {
    test: /\.(pdf|jpg|png|gif|ico|json)$/,
    loader: "file-loader",
    exclude: [
      path.resolve(__dirname, "src/localization"),
      path.resolve(__dirname, "node_modules"),
    ],
    options: {
      name() {
        return "files/[name].[hash:8].[ext]";
      },
    },
  },
  locales: {
    test: /\.json$/,
    include: [path.resolve(__dirname, "src/localization")],
    exclude: /node_modules/,
    type: "javascript/auto",
    loader: "file-loader",
    options: {
      name() {
        return "locales/[name].[hash:8].[ext]";
      },
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
        // compiles Less to CSS
        loader: "less-loader",
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
          plugins: [autoprefixer()],
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
  new ForkTsCheckerWebpackPlugin({ async: true }),
  ...(IS_PRODUCTION
    ? [
        new MiniCssExtractPlugin({
          filename: "styles/[contenthash].css",
          chunkFilename: "styles/[contenthash].chunk.css",
          ignoreOrder: false,
        }),
      ]
    : []),
  ...(!IS_SSR
    ? [
        new HtmlWebpackPlugin({
          template: "public/index.html",
        }),
      ]
    : []),
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
