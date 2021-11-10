import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";

var _templateObject;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.assign.js";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import global from 'global';
import { logger } from '@storybook/client-logger';
import { storyNameFromExport, toId } from '@storybook/csf';
import dedent from 'ts-dedent';
import deprecate from 'util-deprecate';
var _global$FEATURES = global.FEATURES,
    FEATURES = _global$FEATURES === void 0 ? {} : _global$FEATURES;
var deprecatedStoryAnnotation = dedent(_templateObject || (_templateObject = _taggedTemplateLiteral(["\nCSF .story annotations deprecated; annotate story functions directly:\n- StoryFn.story.name => StoryFn.storyName\n- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)\nSee https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.\n"])));
var deprecatedStoryAnnotationWarning = deprecate(function () {}, deprecatedStoryAnnotation);
/**
 * Utilities for normalizing a story to support different
 */

export var normalizeV2 = function normalizeV2(key, storyExport, meta, globalRender) {
  var exportType = _typeof(storyExport);

  if (exportType !== 'function') {
    logger.info("Unexpected story export \"".concat(key, "\": expected function, received \"").concat(exportType, "\"."));
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
    logger.debug('deprecated story', story);
    deprecatedStoryAnnotationWarning();
  }

  var exportName = storyNameFromExport(key);
  var parameters = Object.assign({}, storyParams, {
    __id: toId(meta.id || meta.title, exportName),
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
export var normalizeV3 = function normalizeV3(key, storyExport, meta, globalRender) {
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
  var exportName = storyNameFromExport(key);
  var parameters = Object.assign({}, storyParams, {
    __id: toId(meta.id || meta.title, exportName),
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
export var normalizeStory = FEATURES.previewCsfV3 ? normalizeV3 : normalizeV2;