var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: {
    'index': './index.ts'
  },
  
  output: {
    path: './',
    filename: '[name].js',
    library: 'ngII', 
    libraryTarget: 'umd'
  },

  externals: {
    "clipboard": "clipboard",
    '@angular/core': { root: ['ng', 'core'], commonjs: '@angular/core', commonjs2: '@angular/core', amd: '@angular/core' },
    'rxjs/Rx': { root: 'Rx', commonjs: 'rxjs/Rx', commonjs2: 'rxjs/Rx', amd: 'rxjs/Rx' },
    'rxjs/add/operator/let': {
      root: ['Rx', 'Observable', 'prototype'],
      commonjs: 'rxjs/add/operator/let',
      commonjs2: 'rxjs/add/operator/let',
      amd: 'rxjs/add/operator/let'
    }
  },

  resolve: {
    extensions: ['', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    })
  ]
};
