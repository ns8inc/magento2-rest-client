const fs = require('fs');
const path = require('path');

function DtsBundlePlugin() {}
  DtsBundlePlugin.prototype.apply = function (compiler) {
    const dts = require('dts-bundle');
    compiler.plugin('done', function () {
      dts.bundle({
        name: 'app',
        main: 'tmp/index.d.ts',
        out: '../dist/app.d.ts',
        removeSource: false,
        outputAsModuleFolder: true // to use npm in-package typings
      });
    });
};

// Resolve Common JS & Node Modules
let nodeModules = {};
fs
  .readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

let config = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    library: 'app',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'awesome-typescript-loader'
      }],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new DtsBundlePlugin()
  ],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: nodeModules
};

module.exports = config;