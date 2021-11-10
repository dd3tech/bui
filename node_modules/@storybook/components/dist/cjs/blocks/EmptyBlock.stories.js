"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _EmptyBlock = require("./EmptyBlock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Docs/EmptyBlock',
  component: _EmptyBlock.EmptyBlock
};
exports.default = _default;

var error = function error() {
  return /*#__PURE__*/_react.default.createElement(_EmptyBlock.EmptyBlock, null, "Generic error message");
};

exports.error = error;
error.displayName = "error";