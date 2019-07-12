const { parallel, watch, src, dest } = require('gulp')
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const css = (cb) => {
  src('./assets/style.scss')
  .pipe(sassGlob())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(
    autoprefixer()
  )
  .pipe(dest('assets/'));
  cb()
}

const js = (cb) => {
  src('_components/**/*.js')
  .pipe(webpackStream({
    devtool: 'source-map',
    mode: 'production',
    output: {
      filename: 'scripts.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env']
            }
          }
        }
      ]
    },
    plugins: [
      new UglifyJsPlugin({
        sourceMap: true
      })
    ]
  }, webpack))
  .pipe(dest('assets/'))
  cb();
}

const dev = cb => {
  watch([
    'assets/style.scss', 
    '_components/**/*.scss', 
    '_components/**/*.js'
  ],
  parallel(css,js))
  cb()
};

exports.dev = dev;
exports.default = parallel(css, js);