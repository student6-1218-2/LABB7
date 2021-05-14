require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: __dirname + "/src/index.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: '[name].bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  module: {  // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                     browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          }
        ],

      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: process.env.ASSET_IMAGES_PATH,
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: process.env.ASSET_FONT_PATH,
          },
        },
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack Index",
      template: __dirname + "/src/pages/index.html",
      inject: 'body',
      filename:"index.html"
    }),
    new HtmlWebpackPlugin({
      title: "Webpack News",
      template: __dirname + "/src/pages/news.html",
      inject: 'body',
      filename: "news.html"
    }),

    new HtmlWebpackPlugin({
      title: "Webpack Photo",
      template: __dirname + "/src/pages/photo.html",
      inject: 'body',
      filename: "photo.html"
    }),

    new HtmlWebpackPlugin({
      title: "Webpack Rozklad",
      template: __dirname + "/src/pages/rozklad.html",
      inject: 'body',
      filename: "rozklad.html"
    }),


    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: process.env.STYLE_FILE
    })



  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
  },
}
