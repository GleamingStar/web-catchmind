const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const dotenv = require('dotenv');

module.exports = () => {
  dotenv.config();

  return {
    mode: 'production',
    entry: './src/client/index.tsx',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        client: path.resolve(__dirname, 'src/client'),
        shared: path.resolve(__dirname, 'src/shared'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/client/index.html',
      }),
      new webpack.EnvironmentPlugin({
        SERVER_URL: process.env.SERVER_URL,
      }),
    ],
  };
};
