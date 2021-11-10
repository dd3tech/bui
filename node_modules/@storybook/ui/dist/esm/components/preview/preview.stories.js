import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Provider as ManagerProvider, Consumer } from '@storybook/api';
import { createMemorySource, createHistory } from '@reach/router';
import { Location, LocationProvider } from '@storybook/router';
import { ThemeProvider, ensure as ensureTheme, themes } from '@storybook/theming';
import { Preview } from './preview';
import { PrettyFakeProvider } from '../../FakeProvider';
import { previewProps } from './preview.mockdata';
var provider = new PrettyFakeProvider();
export default {
  title: 'UI/Preview',
  component: Preview,
  decorators: [function (StoryFn, c) {
    return /*#__PURE__*/React.createElement(LocationProvider, {
      key: "location.provider",
      history: createHistory(createMemorySource('/?path=/story/story--id'))
    }, /*#__PURE__*/React.createElement(Location, {
      key: "location.consumer"
    }, function (locationData) {
      return /*#__PURE__*/React.createElement(ManagerProvider, _extends({
        key: "manager",
        provider: provider
      }, locationData, {
        docsMode: false
      }), /*#__PURE__*/React.createElement(ThemeProvider, {
        key: "theme.provider",
        theme: ensureTheme(themes.light)
      }, /*#__PURE__*/React.createElement(StoryFn, c)));
    }));
  }]
};
export var noTabs = function noTabs() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref) {
    var api = _ref.api;
    return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
      }),
      story: {
        parameters: {
          previewTabs: {
            canvas: {
              hidden: true
            }
          }
        }
      }
    }));
  });
};
noTabs.displayName = "noTabs";
export var hideFullscreen = function hideFullscreen() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref2) {
    var api = _ref2.api;
    return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
      }),
      story: {
        parameters: {
          toolbar: {
            fullscreen: {
              hidden: true
            }
          }
        }
      }
    }));
  });
};
hideFullscreen.displayName = "hideFullscreen";
export var hideAllDefaultTools = function hideAllDefaultTools() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref3) {
    var api = _ref3.api;
    return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
      }),
      story: {
        parameters: {
          toolbar: {
            title: {
              hidden: true
            },
            zoom: {
              hidden: true
            },
            eject: {
              hidden: true
            },
            copy: {
              hidden: true
            },
            fullscreen: {
              hidden: true
            }
          }
        }
      }
    }));
  });
};
hideAllDefaultTools.displayName = "hideAllDefaultTools";
export var withCanvasTab = function withCanvasTab() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref4) {
    var api = _ref4.api;
    return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
      })
    }));
  });
};
withCanvasTab.displayName = "withCanvasTab";
export var withTabs = function withTabs() {
  return /*#__PURE__*/React.createElement(Preview, previewProps);
};
withTabs.displayName = "withTabs";