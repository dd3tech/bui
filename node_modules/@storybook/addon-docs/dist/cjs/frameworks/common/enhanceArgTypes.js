"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceArgTypes = void 0;

require("core-js/modules/es.object.assign.js");

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _clientApi = require("@storybook/client-api");

var _normalizeArgTypes = require("./normalizeArgTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhanceArgTypes = function enhanceArgTypes(context) {
  var _context$parameters = context.parameters,
      component = _context$parameters.component,
      _context$parameters$a = _context$parameters.argTypes,
      userArgTypes = _context$parameters$a === void 0 ? {} : _context$parameters$a,
      _context$parameters$d = _context$parameters.docs,
      docs = _context$parameters$d === void 0 ? {} : _context$parameters$d;
  var extractArgTypes = docs.extractArgTypes;
  var normalizedArgTypes = (0, _normalizeArgTypes.normalizeArgTypes)(userArgTypes);
  var namedArgTypes = (0, _mapValues.default)(normalizedArgTypes, function (val, key) {
    return Object.assign({
      name: key
    }, val);
  });
  var extractedArgTypes = extractArgTypes && component ? extractArgTypes(component) : {};
  var withExtractedTypes = extractedArgTypes ? (0, _clientApi.combineParameters)(extractedArgTypes, namedArgTypes) : namedArgTypes;
  return withExtractedTypes;
};

exports.enhanceArgTypes = enhanceArgTypes;