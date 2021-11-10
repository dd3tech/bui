"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.es6Transpiler = void 0;

var _babel = require("./babel");

var _babelConfig = (0, _babel.babelConfig)(),
    plugins = _babelConfig.plugins;

var nodeModulesThatNeedToBeParsedBecauseTheyExposeES6 = ['@storybook/node_logger', 'node_modules/acorn-jsx', 'node_modules/highlight.js', 'node_modules/json5', 'node_modules/semver'];

var es6Transpiler = function () {
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

exports.es6Transpiler = es6Transpiler;