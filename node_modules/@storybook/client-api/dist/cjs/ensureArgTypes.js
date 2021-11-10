"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureArgTypes = void 0;

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _parameters = require("./parameters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ensureArgTypes = function ensureArgTypes(context) {
  var _context$parameters = context.parameters,
      _context$parameters$a = _context$parameters.argTypes,
      userArgTypes = _context$parameters$a === void 0 ? {} : _context$parameters$a,
      _context$parameters$a2 = _context$parameters.args,
      args = _context$parameters$a2 === void 0 ? {} : _context$parameters$a2;
  if (!args) return userArgTypes;
  var argTypes = (0, _mapValues.default)(args, function (_arg, name) {
    return {
      name: name
    };
  });
  return (0, _parameters.combineParameters)(argTypes, userArgTypes);
};

exports.ensureArgTypes = ensureArgTypes;