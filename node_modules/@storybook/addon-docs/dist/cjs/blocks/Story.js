"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Story = exports.getStoryProps = exports.lookupStoryId = exports.storyBlockIdFromId = void 0;

require("core-js/modules/es.function.name.js");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@mdx-js/react");

var _components = require("@storybook/components");

var _csf = require("@storybook/csf");

var _types = require("./types");

var _DocsContext = require("./DocsContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storyBlockIdFromId = function storyBlockIdFromId(storyId) {
  return "story--".concat(storyId);
};

exports.storyBlockIdFromId = storyBlockIdFromId;

var lookupStoryId = function lookupStoryId(storyName, _ref) {
  var mdxStoryNameToKey = _ref.mdxStoryNameToKey,
      mdxComponentMeta = _ref.mdxComponentMeta;
  return (0, _csf.toId)(mdxComponentMeta.id || mdxComponentMeta.title, (0, _csf.storyNameFromExport)(mdxStoryNameToKey[storyName]));
};

exports.lookupStoryId = lookupStoryId;

var getStoryProps = function getStoryProps(props, context) {
  var _ref2 = props,
      id = _ref2.id;
  var _ref3 = props,
      name = _ref3.name;
  var inputId = id === _types.CURRENT_SELECTION ? context.id : id;
  var previewId = inputId || lookupStoryId(name, context);
  var data = context.storyStore.fromId(previewId) || {};
  var height = props.height,
      inline = props.inline;
  var _data$storyFn = data.storyFn,
      storyFn = _data$storyFn === void 0 ? undefined : _data$storyFn,
      _data$name = data.name,
      storyName = _data$name === void 0 ? undefined : _data$name,
      _data$parameters = data.parameters,
      parameters = _data$parameters === void 0 ? {} : _data$parameters;
  var _parameters$docs = parameters.docs,
      docs = _parameters$docs === void 0 ? {} : _parameters$docs;

  if (docs.disable) {
    return null;
  } // prefer block props, then story parameters defined by the framework-specific settings and optionally overridden by users


  var _docs$inlineStories = docs.inlineStories,
      inlineStories = _docs$inlineStories === void 0 ? false : _docs$inlineStories,
      _docs$iframeHeight = docs.iframeHeight,
      iframeHeight = _docs$iframeHeight === void 0 ? 100 : _docs$iframeHeight,
      prepareForInline = docs.prepareForInline;
  var storyIsInline = typeof inline === 'boolean' ? inline : inlineStories;

  if (storyIsInline && !prepareForInline) {
    throw new Error("Story '".concat(storyName, "' is set to render inline, but no 'prepareForInline' function is implemented in your docs configuration!"));
  }

  return {
    parameters: parameters,
    inline: storyIsInline,
    id: previewId,
    storyFn: prepareForInline && storyFn ? function () {
      return prepareForInline(storyFn, data);
    } : storyFn,
    height: height || (storyIsInline ? undefined : iframeHeight),
    title: storyName
  };
};

exports.getStoryProps = getStoryProps;

var Story = function Story(props) {
  return /*#__PURE__*/_react.default.createElement(_DocsContext.DocsContext.Consumer, null, function (context) {
    var storyProps = getStoryProps(props, context);

    if (!storyProps) {
      return null;
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      id: storyBlockIdFromId(storyProps.id)
    }, /*#__PURE__*/_react.default.createElement(_react2.MDXProvider, {
      components: _components.resetComponents
    }, /*#__PURE__*/_react.default.createElement(_components.Story, storyProps)));
  });
};

exports.Story = Story;
Story.defaultProps = {
  children: null,
  name: null
};