import path from 'path';
import cleanPlugin from 'webpack-clean-plugin';
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
      plugins: [new cleanPlugin()],
});
