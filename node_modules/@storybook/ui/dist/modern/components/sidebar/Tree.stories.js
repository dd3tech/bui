import "core-js/modules/es.array.reduce.js";
import React from 'react';
import { Tree } from './Tree';
import { stories } from './mockdata.large';
import { DEFAULT_REF_ID } from './data';
export default {
  component: Tree,
  title: 'UI/Sidebar/Tree',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '230px'
    }
  }, storyFn())]
};
const refId = DEFAULT_REF_ID;
const storyId = Object.values(stories).find(story => story.isLeaf && !story.isComponent).id;

const log = id => console.log(id);

export const Full = () => {
  const [selectedId, setSelectedId] = React.useState(storyId);
  return /*#__PURE__*/React.createElement(Tree, {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: stories,
    highlightedRef: {
      current: {
        itemId: selectedId,
        refId
      }
    },
    setHighlightedItemId: log,
    selectedStoryId: selectedId,
    onSelectStoryId: setSelectedId
  });
};
Full.displayName = "Full";
const singleStoryComponent = {
  single: {
    name: 'Single',
    id: 'single',
    parent: false,
    depth: 0,
    children: ['single--single'],
    isComponent: true,
    isLeaf: false,
    isRoot: false,
    label: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD25 Single")
  },
  'single--single': {
    id: 'single--single',
    kind: 'Single',
    name: 'Single',
    story: 'Single',
    args: {},
    argTypes: {},
    initialArgs: {},
    depth: 1,
    parent: 'single',
    isLeaf: true,
    isComponent: false,
    isRoot: false,
    label: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD25 Single")
  }
};
const tooltipStories = Object.keys(stories).reduce((acc, key) => {
  if (key === 'tooltip-tooltipselect--default') {
    acc['tooltip-tooltipselect--tooltipselect'] = Object.assign({}, stories[key], {
      id: 'tooltip-tooltipselect--tooltipselect',
      name: 'TooltipSelect'
    });
    return acc;
  }

  if (key === 'tooltip-tooltipselect') {
    acc[key] = Object.assign({}, stories[key], {
      children: ['tooltip-tooltipselect--tooltipselect']
    });
    return acc;
  }

  if (key.startsWith('tooltip')) acc[key] = stories[key];
  return acc;
}, {});
export const SingleStoryComponents = () => {
  const [selectedId, setSelectedId] = React.useState('tooltip-tooltipbuildlist--default');
  return /*#__PURE__*/React.createElement(Tree, {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: Object.assign({}, singleStoryComponent, tooltipStories),
    highlightedRef: {
      current: {
        itemId: selectedId,
        refId
      }
    },
    setHighlightedItemId: log,
    selectedStoryId: selectedId,
    onSelectStoryId: setSelectedId
  });
};
SingleStoryComponents.displayName = "SingleStoryComponents";