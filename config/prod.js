const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const baseConfig = require('./base');


const APP_DIR = path.resolve(__dirname, '../src/client');

const config = _.merge({
  entry: [
    `${APP_DIR}/index.tsx`,
  ],
  cache: false,
}, baseConfig);

config.plugins = [].concat(baseConfig.plugins, [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.IgnorePlugin(new RegExp('^(fs|ipc|vertx)$')),
]);

module.exports = config;
