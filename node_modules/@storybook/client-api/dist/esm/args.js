import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.object.freeze.js";

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.array.reduce.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.array.find-index.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.map.js";
import { once } from '@storybook/client-logger';
import isPlainObject from 'lodash/isPlainObject';
import dedent from 'ts-dedent';
var INCOMPATIBLE = Symbol('incompatible');

var map = function map(arg, type) {
  if (arg === undefined || arg === null || !type) return arg;

  switch (type.name) {
    case 'string':
      return String(arg);

    case 'enum':
      return arg;

    case 'number':
      return Number(arg);

    case 'boolean':
      return arg === 'true';

    case 'array':
      if (!type.value || !Array.isArray(arg)) return INCOMPATIBLE;
      return arg.reduce(function (acc, item, index) {
        var mapped = map(item, type.value);
        if (mapped !== INCOMPATIBLE) acc[index] = mapped;
        return acc;
      }, new Array(arg.length));

    case 'object':
      if (typeof arg === 'string' || typeof arg === 'number') return arg;
      if (!type.value || _typeof(arg) !== 'object') return INCOMPATIBLE;
      return Object.entries(arg).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        var mapped = map(val, type.value[key]);
        return mapped === INCOMPATIBLE ? acc : Object.assign(acc, _defineProperty({}, key, mapped));
      }, {});

    default:
      return INCOMPATIBLE;
  }
};

export var mapArgsToTypes = function mapArgsToTypes(args, argTypes) {
  return Object.entries(args).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    if (!argTypes[key]) return acc;
    var mapped = map(value, argTypes[key].type);
    return mapped === INCOMPATIBLE ? acc : Object.assign(acc, _defineProperty({}, key, mapped));
  }, {});
};
export var combineArgs = function combineArgs(value, update) {
  if (Array.isArray(value) && Array.isArray(update)) {
    return update.reduce(function (acc, upd, index) {
      acc[index] = combineArgs(value[index], update[index]);
      return acc;
    }, _toConsumableArray(value)).filter(function (v) {
      return v !== undefined;
    });
  }

  if (!isPlainObject(value) || !isPlainObject(update)) return update;
  return Object.keys(Object.assign({}, value, update)).reduce(function (acc, key) {
    if (key in update) {
      var combined = combineArgs(value[key], update[key]);
      if (combined !== undefined) acc[key] = combined;
    } else {
      acc[key] = value[key];
    }

    return acc;
  }, {});
};
export var validateOptions = function validateOptions(args, argTypes) {
  return Object.entries(argTypes).reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        options = _ref6[1].options;

    if (!options) {
      if (key in args) {
        acc[key] = args[key];
      }

      return acc;
    }

    if (!Array.isArray(options)) {
      once.error(dedent(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        Invalid argType: '", ".options' should be an array.\n\n        More info: https://storybook.js.org/docs/react/api/argtypes\n      "])), key));
      acc[key] = args[key];
      return acc;
    }

    if (options.some(function (opt) {
      return opt && ['object', 'function'].includes(_typeof(opt));
    })) {
      once.error(dedent(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        Invalid argType: '", ".options' should only contain primitives. Use a 'mapping' for complex values.\n\n        More info: https://storybook.js.org/docs/react/writing-stories/args#mapping-to-complex-arg-values\n      "])), key));
      acc[key] = args[key];
      return acc;
    }

    var isArray = Array.isArray(args[key]);
    var invalidIndex = isArray && args[key].findIndex(function (val) {
      return !options.includes(val);
    });
    var isValidArray = isArray && invalidIndex === -1;

    if (args[key] === undefined || options.includes(args[key]) || isValidArray) {
      acc[key] = args[key];
      return acc;
    }

    var field = isArray ? "".concat(key, "[").concat(invalidIndex, "]") : key;
    var supportedOptions = options.map(function (opt) {
      return typeof opt === 'string' ? "'".concat(opt, "'") : String(opt);
    }).join(', ');
    once.warn("Received illegal value for '".concat(field, "'. Supported options: ").concat(supportedOptions));
    return acc;
  }, {});
};