const webpackConfig = require("./webpack.config.base");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfigProd = {
  ...webpackConfig.baseConfig,
  mode: "production",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          ...webpackConfig.baseLoaders.scss,
        ],
      },
    ],
  },
  plugins: [
    ...webpackConfig.basePlugins,
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};

module.exports = webpackConfigProd;