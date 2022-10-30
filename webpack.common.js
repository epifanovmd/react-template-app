const webpack = require("webpack");
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const IS_DEVELOPMENT =
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV !== "production";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const loaders = IS_SSR => ({
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
        options: { happyPackMode: true },
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
    use: [
      "babel-loader",
      {
        loader: "react-svg-loader",
        options: {
          svgo: {
            plugins: [{ removeTitle: false }],
            floatPrecision: 2,
          },
        },
      },
    ],
  },
  file: {
    test: /\.(pdf|jpg|png|gif|ico|json)$/,
    loader: "file-loader",
    exclude: [path.resolve(__dirname, "src/localization"), /node_modules/],
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
        loader:
          IS_PRODUCTION || IS_SSR
            ? MiniCssExtractPlugin.loader
            : "style-loader",
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
        loader:
          IS_PRODUCTION || IS_SSR
            ? MiniCssExtractPlugin.loader
            : "style-loader",
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
        loader:
          IS_PRODUCTION || IS_SSR
            ? MiniCssExtractPlugin.loader
            : "style-loader",
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
          sourceMap: true,
        },
      },
    ],
  },
});

const plugins = IS_SSR => [
  new ESLintPlugin({
    cache: true,
    emitWarning: true,
  }),
  new ForkTsCheckerWebpackPlugin({ async: true }),
  ...(IS_PRODUCTION || IS_SSR ? [new MiniCssExtractPlugin()] : []),
  ...(!IS_SSR
    ? [
        new HtmlWebpackPlugin({
          template: "index.html",
        }),
      ]
    : []),
  new webpack.DefinePlugin({
    IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
    IS_PRODUCTION: JSON.stringify(IS_PRODUCTION),
    IS_SSR: JSON.stringify(IS_SSR),
    "process.env.PORT": JSON.stringify(process.env.PORT),
  }),
];

module.exports = {
  loaders,
  plugins,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
};
