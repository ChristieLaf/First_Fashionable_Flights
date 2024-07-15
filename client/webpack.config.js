const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // Plugins configuration
  plugins: [
    //naviagte one folder up to the template directory, the base folder is webpack config
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_FLIGHT_URL': JSON.stringify(
        process.env.REACT_APP_FLIGHT_URL
      ),
      'process.env.REACT_APP_FLIGHT_API': JSON.stringify(
        process.env.REACT_APP_FLIGHT_KEY
      ),
    }),
  ],
  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        changeOrigin: true,
        secure: false,
        target: `http://localhost:3000/`,
      },
    ],
  },
};
