function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import mapValues from 'lodash/mapValues';
import { ArgsTable as PureArgsTable, ArgsTableError, TabbedArgsTable } from '@storybook/components';
import { filterArgTypes } from '@storybook/client-api';
import Events from '@storybook/core-events';
import { DocsContext } from './DocsContext';
import { CURRENT_SELECTION, PRIMARY_STORY } from './types';
import { getComponentName, getDocsStories } from './utils';
import { lookupStoryId } from './Story';

const useArgs = (storyId, storyStore) => {
  const story = storyStore.fromId(storyId);

  if (!story) {
    throw new Error(`Unknown story: ${storyId}`);
  }

  const {
    args: initialArgs
  } = story;
  const [args, setArgs] = useState(initialArgs);
  useEffect(() => {
    const cb = changed => {
      if (changed.storyId === storyId) {
        setArgs(changed.args);
      }
    };

    storyStore._channel.on(Events.STORY_ARGS_UPDATED, cb);

    return () => storyStore._channel.off(Events.STORY_ARGS_UPDATED, cb);
  }, [storyId]);
  const updateArgs = useCallback(newArgs => storyStore.updateStoryArgs(storyId, newArgs), [storyId]);
  const resetArgs = useCallback(argNames => storyStore.resetStoryArgs(storyId, argNames), [storyId]);
  return [args, updateArgs, resetArgs];
};

export const extractComponentArgTypes = (component, {
  parameters
}, include, exclude) => {
  const params = parameters || {};
  const {
    extractArgTypes
  } = params.docs || {};

  if (!extractArgTypes) {
    throw new Error(ArgsTableError.ARGS_UNSUPPORTED);
  }

  let argTypes = extractArgTypes(component);
  argTypes = filterArgTypes(argTypes, include, exclude);
  return argTypes;
};

const isShortcut = value => {
  return value && [CURRENT_SELECTION, PRIMARY_STORY].includes(value);
};

export const getComponent = (props = {}, context) => {
  const {
    of
  } = props;
  const {
    story
  } = props;
  const {
    parameters = {}
  } = context;
  const {
    component
  } = parameters;

  if (isShortcut(of) || isShortcut(story)) {
    return component || null;
  }

  if (!of) {
    throw new Error(ArgsTableError.NO_COMPONENT);
  }

  return of;
};

const addComponentTabs = (tabs, components, context, include, exclude, sort) => Object.assign({}, tabs, mapValues(components, comp => ({
  rows: extractComponentArgTypes(comp, context, include, exclude),
  sort
})));

export const StoryTable = props => {
  const context = useContext(DocsContext);
  const {
    id: currentId,
    parameters: {
      argTypes
    },
    storyStore
  } = context;
  const {
    story,
    component,
    subcomponents,
    showComponent,
    include,
    exclude,
    sort
  } = props;
  let storyArgTypes;

  try {
    let storyId;

    switch (story) {
      case CURRENT_SELECTION:
        {
          storyId = currentId;
          storyArgTypes = argTypes;
          break;
        }

      case PRIMARY_STORY:
        {
          const primaryStory = getDocsStories(context)[0];
          storyId = primaryStory.id;
          storyArgTypes = primaryStory.parameters.argTypes;
          break;
        }

      default:
        {
          storyId = lookupStoryId(story, context);
          const data = storyStore.fromId(storyId);
          storyArgTypes = data.parameters.argTypes;
        }
    }

    storyArgTypes = filterArgTypes(storyArgTypes, include, exclude);
    const mainLabel = getComponentName(component) || 'Story'; // eslint-disable-next-line prefer-const

    let [args, updateArgs, resetArgs] = useArgs(storyId, storyStore);
    let tabs = {
      [mainLabel]: {
        rows: storyArgTypes,
        args,
        updateArgs,
        resetArgs
      }
    }; // Use the dynamically generated component tabs if there are no controls

    const storyHasArgsWithControls = storyArgTypes && Object.values(storyArgTypes).find(v => !!(v !== null && v !== void 0 && v.control));

    if (!storyHasArgsWithControls) {
      updateArgs = null;
      resetArgs = null;
      tabs = {};
    }

    if (component && (!storyHasArgsWithControls || showComponent)) {
      tabs = addComponentTabs(tabs, {
        [mainLabel]: component
      }, context, include, exclude);
    }

    if (subcomponents) {
      if (Array.isArray(subcomponents)) {
        throw new Error(`Unexpected subcomponents array. Expected an object whose keys are tab labels and whose values are components.`);
      }

      tabs = addComponentTabs(tabs, subcomponents, context, include, exclude);
    }

    return /*#__PURE__*/React.createElement(TabbedArgsTable, {
      tabs: tabs,
      sort: sort
    });
  } catch (err) {
    return /*#__PURE__*/React.createElement(PureArgsTable, {
      error: err.message
    });
  }
};
export const ComponentsTable = props => {
  const context = useContext(DocsContext);
  const {
    components,
    include,
    exclude,
    sort
  } = props;
  const tabs = addComponentTabs({}, components, context, include, exclude);
  return /*#__PURE__*/React.createElement(TabbedArgsTable, {
    tabs: tabs,
    sort: sort
  });
};
export const ArgsTable = props => {
  const context = useContext(DocsContext);
  const {
    parameters: {
      subcomponents,
      controls
    } = {}
  } = context;
  const {
    include,
    exclude,
    components,
    sort: sortProp
  } = props;
  const {
    story
  } = props;
  const sort = sortProp || (controls === null || controls === void 0 ? void 0 : controls.sort);
  const main = getComponent(props, context);

  if (story) {
    return /*#__PURE__*/React.createElement(StoryTable, _extends({}, props, {
      component: main,
      subcomponents,
      sort
    }));
  }

  if (!components && !subcomponents) {
    let mainProps;

    try {
      mainProps = {
        rows: extractComponentArgTypes(main, context, include, exclude)
      };
    } catch (err) {
      mainProps = {
        error: err.message
      };
    }

    return /*#__PURE__*/React.createElement(PureArgsTable, _extends({}, mainProps, {
      sort: sort
    }));
  }

  if (components) {
    return /*#__PURE__*/React.createElement(ComponentsTable, _extends({}, props, {
      components,
      sort
    }));
  }

  const mainLabel = getComponentName(main);
  return /*#__PURE__*/React.createElement(ComponentsTable, _extends({}, props, {
    components: Object.assign({
      [mainLabel]: main
    }, subcomponents),
    sort: sort
  }));
};
ArgsTable.defaultProps = {
  of: CURRENT_SELECTION
};