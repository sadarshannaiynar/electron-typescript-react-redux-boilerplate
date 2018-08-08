const path = require('path');
const webpack = require('webpack');
const _merge = require('lodash/merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const baseConfig = require('./base');

const APP_DIR = path.resolve(__dirname, '../../src/renderer');

const config = _merge({
  mode: 'development',
  devServer: {
    contentBase: APP_DIR,
    historyApiFallback: true,
    hot: true,
    port: 8100,
    publicPath: 'http://localhost:8100/dist/',
    noInfo: false,
  },
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8100',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    `${APP_DIR}/index.tsx`,
  ],
  devtool: 'source-map',
}, baseConfig);

config.module.rules = config.module.rules.concat({
  test: /\.(scss|sass)$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
});

config.plugins = [].concat(baseConfig.plugins, [
  new webpack.LoaderOptionsPlugin({ options: {}}),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"dev"',
  }),
  new StyleLintPlugin({
    context: `${APP_DIR}/styles/**/*`,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.IgnorePlugin(new RegExp('^(fs|ipc|vertx)$')),
]);

module.exports = config;
