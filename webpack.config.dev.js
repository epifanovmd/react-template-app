const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.base");

const webpackConfigDev = {
  ...webpackConfig.baseConfig,
  mode: "development",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts,
      {
        test: /\.scss$/,
        use: [
          ...webpackConfig.baseLoaders.scss,
        ],
      },
      ...webpackConfig.baseLoaders.font,
      webpackConfig.baseLoaders.file,
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    ...webpackConfig.basePlugins,
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: true,
    noInfo: false,
    proxy: {
      "/users": {
        target: "https://jsonplaceholder.typicode.com/",
        changeOrigin: true,
      },
    },
  },
};

module.exports = webpackConfigDev;
