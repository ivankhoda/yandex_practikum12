

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';



module.exports = {
    entry: { main: './public/main.js' },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].js',
      //publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use:  [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                    {
                        loader:'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader'
                ]
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
                loader: 'file-loader?name=./vendor/fonts/[name].[ext]'
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
             hash: true,
             inject: false,
            template: './public/index.html',
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
     },
        }
      ),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
       new WebpackMd5Hash()
    ],
  devServer: {
    //contentBase: path.join(__dirname, 'public'),
    //compress: true,
    // before: function(app, server, compiler) {
    //   app.get('/some/path', function(req, res) {
    //     res.json({ custom: 'response' });
    //   }),
    contentBase: './public',
    hot: true,
    port: 3000

  }
};
