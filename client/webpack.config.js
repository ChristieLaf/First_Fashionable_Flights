import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';

dotenv.config();

export default {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(path.dirname(''), 'dist'),
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
  plugins: [
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
  devServer: {
    static: {
      directory: path.join(path.dirname(''), 'dist'),
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
