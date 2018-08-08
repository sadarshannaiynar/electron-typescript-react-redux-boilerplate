const baseConfig = require('./base');

const config = Object.assign({}, baseConfig, {
  mode: 'production',
});

module.exports = config;