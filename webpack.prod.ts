import path from 'path';
import cleanPlugin from 'webpack-clean-plugin';
import webpackMerge from 'webpack-merge';

import config from './webpack.common';

export default webpackMerge(config, {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
plugins: [new cleanPlugin()],
});
