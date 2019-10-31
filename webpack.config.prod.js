const webpackConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const client = env => ({
  ...webpackConfig.baseConfigClient,
  mode: "production",
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
      filename: 'client/styles/[name].css',
      chunkFilename: 'client/styles/[id].css',
      ignoreOrder: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env && JSON.stringify(env.NODE_ENV),
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});

const server = env => ({
  ...webpackConfig.baseConfigServer,
  mode: "production",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "isomorphic-style-loader",
          },
          ...webpackConfig.baseLoaders.scss
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});

module.exports = [client, server];

