'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// 是否为生产环境来改变构建流程
const isProd = process.env.NODE_ENV === 'production';
const minPostfix = isProd ? '.min' : '';
const minify = isProd ? 'minimize' : '';
const hash = '[hash:7]';

// 应用入口(发布, 开发)
const entry = './app/js/entry.js';
const devEntry = [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client?reload=true',
  './app/js/entry.js'
];

// 基础控件
const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new HTMLWebpackPlugin({
    title: '导购系统',
    template: 'app/index.html',
    inject: true,
    prod: isProd,
    minify: isProd ? {
      removeComments: true,
      collapseWhitespace: true
    } : null,
  }),
];

// 生产环境使用的控件
const envPlugins = isProd ? [
  new ExtractTextPlugin(`css/style.${hash}${minPostfix}.css`, {
    allChunks: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.BannerPlugin(`build: ${new Date().toString()}`),
] : [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  // @see https://www.npmjs.com/package/eslint-loader#noerrorsplugin
  new webpack.NoErrorsPlugin(),
];

module.exports = {
  debug: !isProd,
  devtool: !isProd ? 'inline-source-map' : null,
  entry: isProd ? entry : devEntry,
  output: {
    path: path.join(__dirname, 'public'),
    filename: `js/app.${hash}${minPostfix}.js`,
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?presets[]=react,presets[]=es2015!eslint-loader',
        exclude: /(node_modules|bower_components)/,
        include: [
          path.join(__dirname, 'app/js'),
          path.resolve(__dirname, 'node_modules/amazeui-touch/js'),
        ]
      },
      {
        test: /\.scss/,
        loader: isProd ? ExtractTextPlugin.extract(
          'style',
          `css?${minify}!postcss!sass`
        ) : `style!css!resolve-url?sourceMap!postcss!resolve-url!sass?sourceMap`,
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
        loaders: [
          'file?name=[path][name].[ext]&context=app',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {test: /\.txt$|\.json$|\.webapp$/, loader: 'file?name=[path][name].[ext]&context=app'},
      {test: /\.eot/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=/fonts/[name].[ext]'},
      {test: /\.svg/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=/fonts/[name].[ext]'},
      {test: /\.woff/, loader: 'url?limit=65000&mimetype=application/font-woff&name=/fonts/[name].[ext]'},
      {test: /\.woff2/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=/fonts/[name].[ext]'},
      {test: /\.[ot]tf/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=/fonts/[name].[ext]'},
    ]
  },

  plugins: basePlugins.concat(envPlugins),

  // global mode
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  //   'react-addons-css-transition-group': ['React', 'addons', 'CSSTransitionGroup'],
  //   'amazeui-touch': 'AMUITouch',
  // },

  // loader config
  postcss: [autoprefixer({browsers: ['> 1%', 'last 2 versions', 'ie 10']})],
};
