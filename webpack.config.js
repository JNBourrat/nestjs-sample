const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  entry: ['./src/main.ts'],
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
}

module.exports = (env, argv) => {

  if (argv.mode === 'development') {

    config.watch = true,
      config.entry = ['./src/main-hmr.ts']
    config.plugins = [
      new CleanWebpackPlugin({}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/])
    ]
  }

  return config;
};