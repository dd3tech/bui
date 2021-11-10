function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var useArgs = function useArgs(storyId, storyStore) {
  var story = storyStore.fromId(storyId);

  if (!story) {
    throw new Error("Unknown story: ".concat(storyId));
  }

  var initialArgs = story.args;

  var _useState = useState(initialArgs),
      _useState2 = _slicedToArray(_useState, 2),
      args = _useState2[0],
      setArgs = _useState2[1];

  useEffect(function () {
    var cb = function cb(changed) {
      if (changed.storyId === storyId) {
        setArgs(changed.args);
      }
    };

    storyStore._channel.on(Events.STORY_ARGS_UPDATED, cb);

    return function () {
      return storyStore._channel.off(Events.STORY_ARGS_UPDATED, cb);
    };
  }, [storyId]);
  var updateArgs = useCallback(function (newArgs) {
    return storyStore.updateStoryArgs(storyId, newArgs);
  }, [storyId]);
  var resetArgs = useCallback(function (argNames) {
    return storyStore.resetStoryArgs(storyId, argNames);
  }, [storyId]);
  return [args, updateArgs, resetArgs];
};

export var extractComponentArgTypes = function extractComponentArgTypes(component, _ref, include, exclude) {
  var parameters = _ref.parameters;
  var params = parameters || {};

  var _ref2 = params.docs || {},
      extractArgTypes = _ref2.extractArgTypes;

  if (!extractArgTypes) {
    throw new Error(ArgsTableError.ARGS_UNSUPPORTED);
  }

  var argTypes = extractArgTypes(component);
  argTypes = filterArgTypes(argTypes, include, exclude);
  return argTypes;
};

var isShortcut = function isShortcut(value) {
  return value && [CURRENT_SELECTION, PRIMARY_STORY].includes(value);
};

export var getComponent = function getComponent() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var context = arguments.length > 1 ? arguments[1] : undefined;
  var _ref3 = props,
      of = _ref3.of;
  var _ref4 = props,
      story = _ref4.story;
  var _context$parameters = context.parameters,
      parameters = _context$parameters === void 0 ? {} : _context$parameters;
  var component = parameters.component;

  if (isShortcut(of) || isShortcut(story)) {
    return component || null;
  }

  if (!of) {
    throw new Error(ArgsTableError.NO_COMPONENT);
  }

  return of;
};

var addComponentTabs = function addComponentTabs(tabs, components, context, include, exclude, sort) {
  return Object.assign({}, tabs, mapValues(components, function (comp) {
    return {
      rows: extractComponentArgTypes(comp, context, include, exclude),
      sort: sort
    };
  }));
};

export var StoryTable = function StoryTable(props) {
  var context = useContext(DocsContext);
  var currentId = context.id,
      argTypes = context.parameters.argTypes,
      storyStore = context.storyStore;
  var story = props.story,
      component = props.component,
      subcomponents = props.subcomponents,
      showComponent = props.showComponent,
      include = props.include,
      exclude = props.exclude,
      sort = props.sort;
  var storyArgTypes;

  try {
    var storyId;

    switch (story) {
      case CURRENT_SELECTION:
        {
          storyId = currentId;
          storyArgTypes = argTypes;
          break;
        }

      case PRIMARY_STORY:
        {
          var primaryStory = getDocsStories(context)[0];
          storyId = primaryStory.id;
          storyArgTypes = primaryStory.parameters.argTypes;
          break;
        }

      default:
        {
          storyId = lookupStoryId(story, context);
          var data = storyStore.fromId(storyId);
          storyArgTypes = data.parameters.argTypes;
        }
    }

    storyArgTypes = filterArgTypes(storyArgTypes, include, exclude);
    var mainLabel = getComponentName(component) || 'Story'; // eslint-disable-next-line prefer-const

    var _useArgs = useArgs(storyId, storyStore),
        _useArgs2 = _slicedToArray(_useArgs, 3),
        args = _useArgs2[0],
        updateArgs = _useArgs2[1],
        resetArgs = _useArgs2[2];

    var tabs = _defineProperty({}, mainLabel, {
      rows: storyArgTypes,
      args: args,
      updateArgs: updateArgs,
      resetArgs: resetArgs
    }); // Use the dynamically generated component tabs if there are no controls


    var storyHasArgsWithControls = storyArgTypes && Object.values(storyArgTypes).find(function (v) {
      return !!(v !== null && v !== void 0 && v.control);
    });

    if (!storyHasArgsWithControls) {
      updateArgs = null;
      resetArgs = null;
      tabs = {};
    }

    if (component && (!storyHasArgsWithControls || showComponent)) {
      tabs = addComponentTabs(tabs, _defineProperty({}, mainLabel, component), context, include, exclude);
    }

    if (subcomponents) {
      if (Array.isArray(subcomponents)) {
        throw new Error("Unexpected subcomponents array. Expected an object whose keys are tab labels and whose values are components.");
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
export var ComponentsTable = function ComponentsTable(props) {
  var context = useContext(DocsContext);
  var components = props.components,
      include = props.include,
      exclude = props.exclude,
      sort = props.sort;
  var tabs = addComponentTabs({}, components, context, include, exclude);
  return /*#__PURE__*/React.createElement(TabbedArgsTable, {
    tabs: tabs,
    sort: sort
  });
};
export var ArgsTable = function ArgsTable(props) {
  var context = useContext(DocsContext);
  var _context$parameters2 = context.parameters;
  _context$parameters2 = _context$parameters2 === void 0 ? {} : _context$parameters2;
  var subcomponents = _context$parameters2.subcomponents,
      controls = _context$parameters2.controls;
  var _ref5 = props,
      include = _ref5.include,
      exclude = _ref5.exclude,
      components = _ref5.components,
      sortProp = _ref5.sort;
  var _ref6 = props,
      story = _ref6.story;
  var sort = sortProp || (controls === null || controls === void 0 ? void 0 : controls.sort);
  var main = getComponent(props, context);

  if (story) {
    return /*#__PURE__*/React.createElement(StoryTable, _extends({}, props, {
      component: main,
      subcomponents: subcomponents,
      sort: sort
    }));
  }

  if (!components && !subcomponents) {
    var mainProps;

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
      components: components,
      sort: sort
    }));
  }

  var mainLabel = getComponentName(main);
  return /*#__PURE__*/React.createElement(ComponentsTable, _extends({}, props, {
    components: Object.assign(_defineProperty({}, mainLabel, main), subcomponents),
    sort: sort
  }));
};
ArgsTable.defaultProps = {
  of: CURRENT_SELECTION
};