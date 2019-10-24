
const webpackConfig = require("./webpack.config.base");

const client = {
  name: "client",
  target: "web",
  ...webpackConfig.baseConfigClient,
  mode: "development",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts
    ]
  }
};

var server = {
  ...webpackConfig.baseConfigServer,
  mode: "development",
  module: {
    rules: [
      webpackConfig.baseLoaders.ts
    ]
  }
};

module.exports = [client, server];


