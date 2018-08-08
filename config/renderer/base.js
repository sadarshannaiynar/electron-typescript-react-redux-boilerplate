const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../../src/main/dist/renderer');
const APP_DIR = path.resolve(__dirname, '../../src/renderer');

module.exports = {
  target: 'electron-renderer',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    extensions: [
      '*',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        include: APP_DIR,
        use: ['source-map-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2)$/,
        exclude: /node_modules/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [],
};