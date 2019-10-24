const webpack = require('webpack');
const config = require('../webpack.config.dev');

const compiler = webpack(config);

const watching = compiler.watch({}, (err, stats) => { // Stats Object
                     // Print watch/build result here...
  console.log(stats.toString({
    chunks: true,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }));
});
