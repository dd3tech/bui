import "core-js/modules/es.object.assign.js";
import mapValues from 'lodash/mapValues';
import { combineParameters } from '@storybook/client-api';
import { normalizeArgTypes } from './normalizeArgTypes';
export var enhanceArgTypes = function enhanceArgTypes(context) {
  var _context$parameters = context.parameters,
      component = _context$parameters.component,
      _context$parameters$a = _context$parameters.argTypes,
      userArgTypes = _context$parameters$a === void 0 ? {} : _context$parameters$a,
      _context$parameters$d = _context$parameters.docs,
      docs = _context$parameters$d === void 0 ? {} : _context$parameters$d;
  var extractArgTypes = docs.extractArgTypes;
  var normalizedArgTypes = normalizeArgTypes(userArgTypes);
  var namedArgTypes = mapValues(normalizedArgTypes, function (val, key) {
    return Object.assign({
      name: key
    }, val);
  });
  var extractedArgTypes = extractArgTypes && component ? extractArgTypes(component) : {};
  var withExtractedTypes = extractedArgTypes ? combineParameters(extractedArgTypes, namedArgTypes) : namedArgTypes;
  return withExtractedTypes;
};