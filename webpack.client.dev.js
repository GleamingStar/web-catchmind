const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['./src/client/index.tsx', 'webpack-hot-middleware/client?path=/__reload&timeout=2000'],
  output: {
    filename: 'app.js',
    path: __dirname,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      client: path.resolve(__dirname, '../src/client'),
      shared: path.resolve(__dirname, '../src/shared'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
