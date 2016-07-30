const Express = require('express');
const path = require('path');
const app = new Express();
const port = 4001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const host = 'localhost';
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(cookieParser());

// serve static files
app.use(Express.static(path.resolve(__dirname, './img')));


app.use((req, res) => {
  const index = path.resolve(__dirname, 'index.html');
  res.sendFile(index);
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (app.get('env') === 'development') {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  server listening on port %s', port);
  }
});