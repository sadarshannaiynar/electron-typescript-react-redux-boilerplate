const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../../src/main/dist');
const APP_DIR = path.resolve(__dirname, '../../src/main');

module.exports = {
  target: 'electron-main',
  entry: [
    `${APP_DIR}/index.ts`,
  ],
  output: {
    path: BUILD_DIR,
    filename: 'index.js',
  },
  node: {
    __dirname: false,
    child_process: false,
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.ts',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: /node_modules/,
        include: APP_DIR,
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        include: APP_DIR,
        use: [{
          loader: 'tslint-loader',
          options: {
            emitErrors: true,
            failOnHint: true,
          }
        }],
      },
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
        include: APP_DIR,
      },
    ],
  },
  plugins: [],
};
