const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../../src/main/dist/main');
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
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
        include: APP_DIR,
      },
    ],
  },
  plugins: [],
};