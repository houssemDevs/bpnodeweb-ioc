import path from 'path';
import merge from 'webpack-merge';

import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
});
