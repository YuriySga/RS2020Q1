const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === 'dev';
const isProd = ENV === 'build';

function setDevTool() {
  if (isDev) {
    return 'cheap-module-eval-source-map';
  } else {
    return 'none';
  }
}

function setDMode() {
  if (isProd) {
    return 'production';
  } else {
    return 'development';
  }
}

const config = {
  target: "web",
  entry: ['./src/js/index.js', './src/css/style.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: setDMode(),
  devtool: setDevTool(),
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'/* , 'eslint-loader' */],
        exclude: [
          /node_modules/
        ]
      },
       {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' 
        ]
    }, 
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: 'img/[name].[ext]'}  
          },
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts'
          }
        }]
      },
      {
        test: /.(mp3)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'audio',
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new HtmlWebPackPlugin({
      template: './src/index2.html',
      filename: './index2.html'
    }),  
    new HtmlWebPackPlugin({
      template: './src/index3.html',
      filename: './index3.html'
    }),  
    new CopyWebpackPlugin([
      // {from: './src/static', to: './'},
      // {from: './src/img', to: './img/'},
    ]),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3002,
    overlay: true,
    stats: 'errors-only',
    clientLogLevel: 'none'
  }
};

if (isProd) {
  config.plugins.push(
    new UglifyJSPlugin()
  );
}

module.exports = config;