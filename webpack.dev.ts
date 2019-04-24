import path from 'path';
import webpackMerge from 'webpack-merge';

import config from './webpack.common';

export default webpackMerge(config, {
  watch: true,
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
});
