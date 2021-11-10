import "core-js/modules/es.function.name.js";
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { resetComponents, Story as PureStory } from '@storybook/components';
import { toId, storyNameFromExport } from '@storybook/csf';
import { CURRENT_SELECTION } from './types';
import { DocsContext } from './DocsContext';
export var storyBlockIdFromId = function storyBlockIdFromId(storyId) {
  return "story--".concat(storyId);
};
export var lookupStoryId = function lookupStoryId(storyName, _ref) {
  var mdxStoryNameToKey = _ref.mdxStoryNameToKey,
      mdxComponentMeta = _ref.mdxComponentMeta;
  return toId(mdxComponentMeta.id || mdxComponentMeta.title, storyNameFromExport(mdxStoryNameToKey[storyName]));
};
export var getStoryProps = function getStoryProps(props, context) {
  var _ref2 = props,
      id = _ref2.id;
  var _ref3 = props,
      name = _ref3.name;
  var inputId = id === CURRENT_SELECTION ? context.id : id;
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

var Story = function Story(props) {
  return /*#__PURE__*/React.createElement(DocsContext.Consumer, null, function (context) {
    var storyProps = getStoryProps(props, context);

    if (!storyProps) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      id: storyBlockIdFromId(storyProps.id)
    }, /*#__PURE__*/React.createElement(MDXProvider, {
      components: resetComponents
    }, /*#__PURE__*/React.createElement(PureStory, storyProps)));
  });
};

Story.defaultProps = {
  children: null,
  name: null
};
export { Story };