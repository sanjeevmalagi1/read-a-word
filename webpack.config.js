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
    ]
  },
  output: {
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new WebpackPwaManifest({
      name: 'Read Assistant',
      short_name: 'Read-Assistant',
      description: 'Improve you reading one word at a time!',
      background_color: '#000000',
      theme_color: '#000000',
      icons: [
        {
          src: path.resolve('src/icon.png'),
          size: '72x72',
        }
      ],
    })
  ]
};
