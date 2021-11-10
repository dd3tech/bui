import mapValues from 'lodash/mapValues';
import { combineParameters } from './parameters';
export var ensureArgTypes = function ensureArgTypes(context) {
  var _context$parameters = context.parameters,
      _context$parameters$a = _context$parameters.argTypes,
      userArgTypes = _context$parameters$a === void 0 ? {} : _context$parameters$a,
      _context$parameters$a2 = _context$parameters.args,
      args = _context$parameters$a2 === void 0 ? {} : _context$parameters$a2;
  if (!args) return userArgTypes;
  var argTypes = mapValues(args, function (_arg, name) {
    return {
      name: name
    };
  });
  return combineParameters(argTypes, userArgTypes);
};