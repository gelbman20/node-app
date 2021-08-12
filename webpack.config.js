const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './frontend/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js/')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
