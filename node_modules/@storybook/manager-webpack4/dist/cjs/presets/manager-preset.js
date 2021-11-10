"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.managerWebpack = managerWebpack;
exports.managerEntries = managerEntries;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

var _coreCommon = require("@storybook/core-common");

var _managerWebpack2 = _interopRequireDefault(require("../manager-webpack.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function managerWebpack(_x, _x2) {
  return _managerWebpack.apply(this, arguments);
}

function _managerWebpack() {
  _managerWebpack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, options) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _managerWebpack2.default)(options));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _managerWebpack.apply(this, arguments);
}

function managerEntries(_x3, _x4) {
  return _managerEntries.apply(this, arguments);
}

function _managerEntries() {
  _managerEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(installedAddons, options) {
    var _options$managerEntry, managerEntry, entries, managerConfig;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _options$managerEntry = options.managerEntry, managerEntry = _options$managerEntry === void 0 ? '@storybook/core-client/dist/esm/manager' : _options$managerEntry;
            entries = options.modern ? [] : [require.resolve('@storybook/core-client/dist/esm/globals/polyfills')];

            if (installedAddons && installedAddons.length) {
              entries.push.apply(entries, _toConsumableArray(installedAddons));
            }

            managerConfig = (0, _coreCommon.loadManagerOrAddonsFile)(options);

            if (managerConfig) {
              entries.push(managerConfig);
            }

            entries.push(require.resolve(managerEntry));
            return _context2.abrupt("return", entries);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _managerEntries.apply(this, arguments);
}