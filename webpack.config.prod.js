const webpackBaseConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
    minimizer: [new TerserPlugin()]
  }
});

const server = (env) => ({
  ...webpackBaseConfig.baseConfigServer(env),
  mode: "production",
  module: {
    rules: [
      webpackBaseConfig.baseLoaders.ts,
      {
        test: /\.(sa|sc|c)ss$/,
        loader: "null-loader",
      },
    ],
  },
});

module.exports = (env) => {
  if (env.SSR) {
    return [client(env), server(env)];
  } else return client(env);
};
