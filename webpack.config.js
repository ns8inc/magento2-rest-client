const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
require('dotenv').config();

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

let mode = 'production';
if (process.env.NODE_ENV && process.env.NODE_ENV.startsWith('dev')) {
  mode = 'development';
}
const config = {
  entry: './src/index.ts',
  mode: mode,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    library: 'app',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: ['node_modules']
  },
  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'awesome-typescript-loader'
      }],
    }]
  },
  plugins: [
    new DtsBundlePlugin(),
    new HardSourceWebpackPlugin({

    }),
  ],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  }
};

module.exports = config;