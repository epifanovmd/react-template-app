const webpackConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const client = {
  ...webpackConfig.baseConfigClient,
  mode: "development",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          ...webpackConfig.baseLoaders.scss
        ],
      },
      ...webpackConfig.baseLoaders.font,
      webpackConfig.baseLoaders.file,
    ],
  },
  plugins: [
    ...webpackConfig.basePlugins,
    new MiniCssExtractPlugin({
      filename: 'static/styles/[name].css',
      chunkFilename: 'static/styles/[id].css',
      ignoreOrder: false,
    }),
  ],
};

module.exports = client;
