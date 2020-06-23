/* eslint-disable global-require */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: { main: './public/main.js' },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|ico|svg)$/i,
        loader: 'file-loader?name=./images/[name].[ext]',
        options: {
          name: '[path][name].[ext]',
          context: '',
          esModule: false,
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: false,
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new webpack.DefinePlugin({
    }),
    new WebpackMd5Hash(),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    port: 3000,
  },
};
