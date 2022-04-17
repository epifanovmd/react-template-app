const { IS_SSR } = require("./webpack.common");
const clientConfig = require("./webpack.client");
const serverConfig = require("./webpack.server");

module.exports = IS_SSR ? [clientConfig, serverConfig] : clientConfig;
