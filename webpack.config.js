const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const TerserPlugin = require('terser-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */

const packageName = require('./package.json').name;

module.exports = {
  entry: './src/index.ts',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: {
      name: packageName,
      type: 'commonjs',
    },
    clean: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            properties: {
              // mangle properties with prefix _
              regex: /^_[a-zA-Z]\w*/,
            },
          },
        },
      }),
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
