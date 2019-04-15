import path from 'path';
import merge from 'webpack-merge';

import commonConfig from './webpack.common';

export default merge(commonConfig, {
  watch: true,
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
});
