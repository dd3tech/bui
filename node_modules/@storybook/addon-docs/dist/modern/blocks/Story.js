import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { resetComponents, Story as PureStory } from '@storybook/components';
import { toId, storyNameFromExport } from '@storybook/csf';
import { CURRENT_SELECTION } from './types';
import { DocsContext } from './DocsContext';
export const storyBlockIdFromId = storyId => `story--${storyId}`;
export const lookupStoryId = (storyName, {
  mdxStoryNameToKey,
  mdxComponentMeta
}) => toId(mdxComponentMeta.id || mdxComponentMeta.title, storyNameFromExport(mdxStoryNameToKey[storyName]));
export const getStoryProps = (props, context) => {
  const {
    id
  } = props;
  const {
    name
  } = props;
  const inputId = id === CURRENT_SELECTION ? context.id : id;
  const previewId = inputId || lookupStoryId(name, context);
  const data = context.storyStore.fromId(previewId) || {};
  const {
    height,
    inline
  } = props;
  const {
    storyFn = undefined,
    name: storyName = undefined,
    parameters = {}
  } = data;
  const {
    docs = {}
  } = parameters;

  if (docs.disable) {
    return null;
  } // prefer block props, then story parameters defined by the framework-specific settings and optionally overridden by users


  const {
    inlineStories = false,
    iframeHeight = 100,
    prepareForInline
  } = docs;
  const storyIsInline = typeof inline === 'boolean' ? inline : inlineStories;

  if (storyIsInline && !prepareForInline) {
    throw new Error(`Story '${storyName}' is set to render inline, but no 'prepareForInline' function is implemented in your docs configuration!`);
  }

  return {
    parameters,
    inline: storyIsInline,
    id: previewId,
    storyFn: prepareForInline && storyFn ? () => prepareForInline(storyFn, data) : storyFn,
    height: height || (storyIsInline ? undefined : iframeHeight),
    title: storyName
  };
};

const Story = props => /*#__PURE__*/React.createElement(DocsContext.Consumer, null, context => {
  const storyProps = getStoryProps(props, context);

  if (!storyProps) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    id: storyBlockIdFromId(storyProps.id)
  }, /*#__PURE__*/React.createElement(MDXProvider, {
    components: resetComponents
  }, /*#__PURE__*/React.createElement(PureStory, storyProps)));
});

Story.defaultProps = {
  children: null,
  name: null
};
export { Story };