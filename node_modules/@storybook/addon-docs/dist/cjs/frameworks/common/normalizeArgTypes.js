"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeArgTypes = void 0;

require("core-js/modules/es.object.assign.js");

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalizeType = function normalizeType(type) {
  return typeof type === 'string' ? {
    name: type
  } : type;
};

var normalizeControl = function normalizeControl(control) {
  return typeof control === 'string' ? {
    type: control
  } : control;
};

var normalizeArgTypes = function normalizeArgTypes(argTypes) {
  return (0, _mapValues.default)(argTypes, function (argType) {
    if (!argType) return argType;
    var normalized = Object.assign({}, argType);
    var type = argType.type,
        control = argType.control;
    if (type) normalized.type = normalizeType(type);
    if (control) normalized.control = normalizeControl(control);
    return normalized;
  });
};

exports.normalizeArgTypes = normalizeArgTypes;