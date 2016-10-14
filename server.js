'use strict';

const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const bundler = webpack(webpackConfig);
const bs = browserSync.create();

bs.init({
  logPrefix: 'AMT',
  server: {
    baseDir: [
      'public',
    ],
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {colors: true}
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },
});
