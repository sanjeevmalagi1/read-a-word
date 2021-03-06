const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/i,
        use: {
            loader: 'style-loader',
        }
      },
      {
        test: /\.(png|mov|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: './src/icon.png'
    }),
    new WebpackPwaManifest({
      name: 'Read A Word',
      short_name: 'Read A Word',
      description: 'Increase your reading speed by reading only one word at a time!',
      background_color: '#000000',
      theme_color: '#000000',
      icons: [
        {
          src: path.resolve('src/icon_high_res.png'),
          size: '512x512',
        }
      ],
    })
  ]
};
