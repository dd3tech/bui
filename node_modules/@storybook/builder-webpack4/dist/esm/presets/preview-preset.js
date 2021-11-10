import "core-js/modules/es.promise.js";
import webpackConfig from '../preview/iframe-webpack.config';
import { createPreviewEntry } from '../preview/entries';
export var webpack = async function (_, options) {
  return webpackConfig(options);
};
export var entries = async function (_, options) {
  var result = [];
  result = result.concat(await createPreviewEntry(options));

  if (options.configType === 'DEVELOPMENT') {
    // Suppress informational messages when --quiet is specified. webpack-hot-middleware's quiet
    // parameter would also suppress warnings.
    result = result.concat(`${require.resolve('webpack-hot-middleware/client')}?reload=true&quiet=false&noInfo=${options.quiet}`);
  }

  return result;
};