import { babelConfig } from './babel';

var _babelConfig = babelConfig(),
    plugins = _babelConfig.plugins;

var nodeModulesThatNeedToBeParsedBecauseTheyExposeES6 = ['@storybook/node_logger', 'node_modules/acorn-jsx', 'node_modules/highlight.js', 'node_modules/json5', 'node_modules/semver'];
export var es6Transpiler = function () {
  // TODO: generate regexp using are-you-es5
  var include = function (input) {
    return !!nodeModulesThatNeedToBeParsedBecauseTheyExposeES6.find(function (p) {
      return input.includes(p);
    }) || !!input.match(/[\\/]node_modules[\\/](@storybook\/node-logger|are-you-es5|better-opn|boxen|chalk|commander|find-cache-dir|find-up|fs-extra|json5|node-fetch|pkg-dir|prettier|resolve-from|semver|highlight\.js|acorn-jsx)/);
  };

  return {
    test: /\.js$/,
    use: [{
      loader: require.resolve('babel-loader'),
      options: {
        sourceType: 'unambiguous',
        presets: [[require.resolve('@babel/preset-env'), {
          shippedProposals: true,
          modules: false,
          loose: true,
          targets: 'defaults'
        }], require.resolve('@babel/preset-react')],
        plugins: plugins
      }
    }],
    include: include
  };
};