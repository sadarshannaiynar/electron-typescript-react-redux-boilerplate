const baseConfig = require('./base');

const config = Object.assign({}, baseConfig, {
  mode: 'development',
  devtool: 'source-map',
});

module.exports = config;
