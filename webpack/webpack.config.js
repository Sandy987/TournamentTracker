const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const port = 4001;

module.exports = {
  port,

  // where does Webpack start building?
  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    './src/JsSrc/index.jsx',
  ],

  // where should Webpack store it processed files
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: `http://localhost:${port}/scripts/`,
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },

  module: {
    loaders: [{
      test: /\.js[x]*$/,
      loaders: ['react-hot', 'babel'],
      exclude: /(node_modules|vendor)/,
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=2&localIdentName=[local]_[hash:base36:5]!postcss-loader',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.jpg$/,
      loader: 'url-loader',
      query: { mimetype: 'image/jpg' },

    }],
  },

  postcss: function postcss() {
    return [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
      precss,
    ];
  },

  progress: true,

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),

    // hot module replacement
    new webpack.HotModuleReplacementPlugin(),

    // make sure build stops when it encounter an error
    new webpack.NoErrorsPlugin(),
  ],

  devtool: 'inline-source-map',
};