"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasDotenv = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Is there a .env file in the current directory?
 *
 * This is the default behavior of `dotenv-webpack-plugin`
 * https://github.com/mrsteele/dotenv-webpack/blob/master/src/index.js#L34
 */
var hasDotenv = function () {
  return _fs.default.existsSync(_path.default.join('.', '.env'));
};

exports.hasDotenv = hasDotenv;