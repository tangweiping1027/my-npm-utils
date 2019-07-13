var path = require('path')
var webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './lib/index.js'),
  // entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        //排除node_modules
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true
  }
}
