import "core-js/modules/es.object.assign.js";
import mapValues from 'lodash/mapValues';

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

export var normalizeArgTypes = function normalizeArgTypes(argTypes) {
  return mapValues(argTypes, function (argType) {
    if (!argType) return argType;
    var normalized = Object.assign({}, argType);
    var type = argType.type,
        control = argType.control;
    if (type) normalized.type = normalizeType(type);
    if (control) normalized.control = normalizeControl(control);
    return normalized;
  });
};