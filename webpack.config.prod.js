const webpackBaseConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const client = env => ({
  ...webpackBaseConfig.baseConfigClient(env),
  mode: "production",
  module: {
    rules: [
      webpackBaseConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          ...webpackBaseConfig.baseLoaders.scss
        ],
      },
      ...webpackBaseConfig.baseLoaders.font,
      webpackBaseConfig.baseLoaders.file,
    ],
  },
  plugins: [
    ...webpackBaseConfig.basePlugins(env),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});

const server = (env) => ({
  ...webpackBaseConfig.baseConfigServer(env),
  mode: "production",
  module: {
    rules: [
      webpackBaseConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "isomorphic-style-loader",
          },
          ...webpackBaseConfig.baseLoaders.scss
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});

module.exports = (env) => {
  if (env.RENDER) {
    return [client(env), server(env)];
  } else return client(env);
};
