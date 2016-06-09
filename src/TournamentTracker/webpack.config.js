var webpack = require('webpack');

module.exports = {
  entry: [
    //"webpack-dev-server/client?http://localhost:51492",
    //"webpack/hot/only-dev-server",
    "babel-polyfill",
    "./JsSrc/index.jsx"
  ],
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/wwwroot/js',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './JsSrc',
    hot: true
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin()
  ]
};