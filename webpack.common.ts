import path from 'path';
import webpack from 'webpack';

import webpackNodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    service: path.resolve(__dirname, 'src/main.ts'),
    worker: path.resolve(__dirname, 'src/scripts/script.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(sql)$/,
        loader: 'raw-loader',
      },
    ],
  },
  externals: [webpackNodeExternals()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts'],
  },
  
};

export default config;
