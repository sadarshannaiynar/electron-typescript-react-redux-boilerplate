const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../src/app/dist');

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
        use: ['source-map-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
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