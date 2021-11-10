"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeStory = exports.normalizeV3 = exports.normalizeV2 = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.assign.js");

var _global = _interopRequireDefault(require("global"));

var _clientLogger = require("@storybook/client-logger");

var _csf = require("@storybook/csf");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _global$FEATURES = _global.default.FEATURES,
    FEATURES = _global$FEATURES === void 0 ? {} : _global$FEATURES;
var deprecatedStoryAnnotation = (0, _tsDedent.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\nCSF .story annotations deprecated; annotate story functions directly:\n- StoryFn.story.name => StoryFn.storyName\n- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)\nSee https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.\n"])));
var deprecatedStoryAnnotationWarning = (0, _utilDeprecate.default)(function () {}, deprecatedStoryAnnotation);
/**
 * Utilities for normalizing a story to support different
 */

var normalizeV2 = function normalizeV2(key, storyExport, meta, globalRender) {
  var exportType = _typeof(storyExport);

  if (exportType !== 'function') {
    _clientLogger.logger.info("Unexpected story export \"".concat(key, "\": expected function, received \"").concat(exportType, "\"."));
  }

  var storyFn = storyExport;
  var story = storyFn.story;
  var _storyFn$storyName = storyFn.storyName,
      storyName = _storyFn$storyName === void 0 ? story === null || story === void 0 ? void 0 : story.name : _storyFn$storyName; // storyFn.x and storyFn.story.x get merged with
  // storyFn.x taking precedence in the merge

  var storyParams = Object.assign({}, story === null || story === void 0 ? void 0 : story.parameters, storyFn.parameters);
  var decorators = [].concat(_toConsumableArray(storyFn.decorators || []), _toConsumableArray((story === null || story === void 0 ? void 0 : story.decorators) || []));
  var loaders = [].concat(_toConsumableArray(storyFn.loaders || []), _toConsumableArray((story === null || story === void 0 ? void 0 : story.loaders) || []));
  var args = Object.assign({}, story === null || story === void 0 ? void 0 : story.args, storyFn.args);
  var argTypes = Object.assign({}, story === null || story === void 0 ? void 0 : story.argTypes, storyFn.argTypes);

  if (story) {
    _clientLogger.logger.debug('deprecated story', story);

    deprecatedStoryAnnotationWarning();
  }

  var exportName = (0, _csf.storyNameFromExport)(key);
  var parameters = Object.assign({}, storyParams, {
    __id: (0, _csf.toId)(meta.id || meta.title, exportName),
    decorators: decorators,
    loaders: loaders,
    args: args,
    argTypes: argTypes
  });
  return {
    name: storyName || exportName,
    storyFn: storyFn,
    parameters: parameters
  };
};

exports.normalizeV2 = normalizeV2;

var normalizeV3 = function normalizeV3(key, storyExport, meta, globalRender) {
  var storyObject = storyExport;

  if (typeof storyExport === 'function') {
    storyObject = Object.assign({}, storyExport);
    storyObject.render = storyExport;
  }

  if (storyObject.story) {
    throw new Error(deprecatedStoryAnnotation);
  }

  var _storyObject = storyObject,
      render = _storyObject.render,
      play = _storyObject.play,
      storyParams = _storyObject.parameters,
      _storyObject$decorato = _storyObject.decorators,
      decorators = _storyObject$decorato === void 0 ? [] : _storyObject$decorato,
      _storyObject$loaders = _storyObject.loaders,
      loaders = _storyObject$loaders === void 0 ? [] : _storyObject$loaders,
      _storyObject$args = _storyObject.args,
      args = _storyObject$args === void 0 ? {} : _storyObject$args,
      _storyObject$argTypes = _storyObject.argTypes,
      argTypes = _storyObject$argTypes === void 0 ? {} : _storyObject$argTypes;
  var storyFn = render || meta.render || globalRender;
  var exportName = (0, _csf.storyNameFromExport)(key);
  var parameters = Object.assign({}, storyParams, {
    __id: (0, _csf.toId)(meta.id || meta.title, exportName),
    decorators: decorators,
    loaders: loaders,
    args: args,
    argTypes: argTypes,
    play: play || meta.play
  });
  return {
    name: storyObject.name || storyObject.storyName || exportName,
    storyFn: storyFn,
    parameters: parameters
  };
};

exports.normalizeV3 = normalizeV3;
var normalizeStory = FEATURES.previewCsfV3 ? normalizeV3 : normalizeV2;
exports.normalizeStory = normalizeStory;