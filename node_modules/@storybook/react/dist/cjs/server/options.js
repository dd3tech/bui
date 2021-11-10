"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _readPkgUp = require("read-pkg-up");

var _default = {
  packageJson: (0, _readPkgUp.sync)({
    cwd: __dirname
  }).packageJson,
  framework: 'react',
  frameworkPresets: [require.resolve('./framework-preset-react'), require.resolve('./framework-preset-cra'), require.resolve('./framework-preset-react-docgen')]
};
exports.default = _default;