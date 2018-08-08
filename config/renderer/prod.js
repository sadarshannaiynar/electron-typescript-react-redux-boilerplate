const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _ = require('lodash');

const baseConfig = require('./base');


const APP_DIR = path.resolve(__dirname, '../../src/renderer');

const config = _.merge({
  mode: 'production',
  entry: [
    `${APP_DIR}/index.tsx`,
  ],
  cache: false,
}, baseConfig);

config.module.rules = config.module.rules.concat({
  test: /\.(scss|sass)$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
});

config.plugins = [].concat(baseConfig.plugins, [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new MiniCssExtractPlugin({
    filename: 'bundle.css',
    chunkFilename: '[name].bundle.css',
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.IgnorePlugin(new RegExp('^(fs|ipc|vertx)$')),
]);

module.exports = config;
