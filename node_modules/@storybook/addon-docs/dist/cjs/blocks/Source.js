"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = exports.getSourceProps = exports.SourceState = void 0;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.join.js");

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _clientLogger = require("@storybook/client-logger");

var _DocsContext = require("./DocsContext");

var _SourceContainer = require("./SourceContainer");

var _types = require("./types");

var _shared = require("../shared");

var _enhanceSource = require("./enhanceSource");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SourceState;
exports.SourceState = SourceState;

(function (SourceState) {
  SourceState["OPEN"] = "open";
  SourceState["CLOSED"] = "closed";
  SourceState["NONE"] = "none";
})(SourceState || (exports.SourceState = SourceState = {}));

var getStoryContext = function getStoryContext(storyId, docsContext) {
  var storyStore = docsContext.storyStore;
  var storyContext = storyStore === null || storyStore === void 0 ? void 0 : storyStore.fromId(storyId);

  if (!storyContext) {
    // Fallback if we can't get the story data for this story
    _clientLogger.logger.warn("Unable to find information for story ID '".concat(storyId, "'"));

    return null;
  }

  return storyContext;
};

var getSourceState = function getSourceState(storyIds, docsContext) {
  var states = storyIds.map(function (storyId) {
    var _storyContext$paramet, _storyContext$paramet2;

    var storyContext = getStoryContext(storyId, docsContext);
    if (!storyContext) return null;
    return (_storyContext$paramet = storyContext.parameters.docs) === null || _storyContext$paramet === void 0 ? void 0 : (_storyContext$paramet2 = _storyContext$paramet.source) === null || _storyContext$paramet2 === void 0 ? void 0 : _storyContext$paramet2.state;
  }).filter(Boolean);
  if (states.length === 0) return SourceState.CLOSED; // FIXME: handling multiple stories is a pain

  return states[0];
};

var getStorySource = function getStorySource(storyId, sourceContext) {
  var sources = sourceContext.sources; // source rendering is async so source is unavailable at the start of the render cycle,
  // so we fail gracefully here without warning

  return (sources === null || sources === void 0 ? void 0 : sources[storyId]) || '';
};

var getSnippet = function getSnippet(snippet, storyContext) {
  var _parameters$docs, _parameters$docs$sour, _parameters$docs2, _parameters$docs2$sou, _enhanced$docs, _enhanced$docs$source;

  if (!storyContext) {
    return snippet;
  }

  var parameters = storyContext.parameters; // eslint-disable-next-line no-underscore-dangle

  var isArgsStory = parameters.__isArgsStory;
  var type = ((_parameters$docs = parameters.docs) === null || _parameters$docs === void 0 ? void 0 : (_parameters$docs$sour = _parameters$docs.source) === null || _parameters$docs$sour === void 0 ? void 0 : _parameters$docs$sour.type) || _shared.SourceType.AUTO; // if user has hard-coded the snippet, that takes precedence

  var userCode = (_parameters$docs2 = parameters.docs) === null || _parameters$docs2 === void 0 ? void 0 : (_parameters$docs2$sou = _parameters$docs2.source) === null || _parameters$docs2$sou === void 0 ? void 0 : _parameters$docs2$sou.code;

  if (userCode) {
    return userCode;
  } // if user has explicitly set this as dynamic, use snippet


  if (type === _shared.SourceType.DYNAMIC) {
    var _parameters$docs3, _parameters$docs3$tra;

    return ((_parameters$docs3 = parameters.docs) === null || _parameters$docs3 === void 0 ? void 0 : (_parameters$docs3$tra = _parameters$docs3.transformSource) === null || _parameters$docs3$tra === void 0 ? void 0 : _parameters$docs3$tra.call(_parameters$docs3, snippet, storyContext)) || snippet;
  } // if this is an args story and there's a snippet


  if (type === _shared.SourceType.AUTO && snippet && isArgsStory) {
    var _parameters$docs4, _parameters$docs4$tra;

    return ((_parameters$docs4 = parameters.docs) === null || _parameters$docs4 === void 0 ? void 0 : (_parameters$docs4$tra = _parameters$docs4.transformSource) === null || _parameters$docs4$tra === void 0 ? void 0 : _parameters$docs4$tra.call(_parameters$docs4, snippet, storyContext)) || snippet;
  } // otherwise, use the source code logic


  var enhanced = (0, _enhanceSource.enhanceSource)(storyContext) || parameters;
  return (enhanced === null || enhanced === void 0 ? void 0 : (_enhanced$docs = enhanced.docs) === null || _enhanced$docs === void 0 ? void 0 : (_enhanced$docs$source = _enhanced$docs.source) === null || _enhanced$docs$source === void 0 ? void 0 : _enhanced$docs$source.code) || '';
};

var getSourceProps = function getSourceProps(props, docsContext, sourceContext) {
  var currentId = docsContext.id,
      _docsContext$paramete = docsContext.parameters,
      parameters = _docsContext$paramete === void 0 ? {} : _docsContext$paramete;
  var codeProps = props;
  var singleProps = props;
  var multiProps = props;
  var source = codeProps.code; // prefer user-specified code

  var targetId = singleProps.id === _types.CURRENT_SELECTION || !singleProps.id ? currentId : singleProps.id;
  var targetIds = multiProps.ids || [targetId];

  if (!source) {
    source = targetIds.map(function (storyId) {
      var storySource = getStorySource(storyId, sourceContext);
      var storyContext = getStoryContext(storyId, docsContext);
      return getSnippet(storySource, storyContext);
    }).join('\n\n');
  }

  var state = getSourceState(targetIds, docsContext);
  var _parameters$docs5 = parameters.docs,
      docsParameters = _parameters$docs5 === void 0 ? {} : _parameters$docs5;
  var _docsParameters$sourc = docsParameters.source,
      sourceParameters = _docsParameters$sourc === void 0 ? {} : _docsParameters$sourc;
  var _sourceParameters$lan = sourceParameters.language,
      docsLanguage = _sourceParameters$lan === void 0 ? null : _sourceParameters$lan;
  return source ? {
    code: source,
    state: state,
    language: props.language || docsLanguage || 'jsx',
    dark: props.dark || false
  } : {
    error: _components.SourceError.SOURCE_UNAVAILABLE,
    state: state
  };
};
/**
 * Story source doc block renders source code if provided,
 * or the source for a story if `storyId` is provided, or
 * the source for the current story if nothing is provided.
 */


exports.getSourceProps = getSourceProps;

var Source = function Source(props) {
  var sourceContext = (0, _react.useContext)(_SourceContainer.SourceContext);
  var docsContext = (0, _react.useContext)(_DocsContext.DocsContext);
  var sourceProps = getSourceProps(props, docsContext, sourceContext);
  return /*#__PURE__*/_react.default.createElement(_components.Source, sourceProps);
};

exports.Source = Source;