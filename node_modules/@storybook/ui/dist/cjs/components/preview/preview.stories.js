"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTabs = exports.withCanvasTab = exports.hideAllDefaultTools = exports.hideFullscreen = exports.noTabs = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _router = require("@reach/router");

var _router2 = require("@storybook/router");

var _theming = require("@storybook/theming");

var _preview = require("./preview");

var _FakeProvider = require("../../FakeProvider");

var _preview2 = require("./preview.mockdata");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var provider = new _FakeProvider.PrettyFakeProvider();
var _default = {
  title: 'UI/Preview',
  component: _preview.Preview,
  decorators: [function (StoryFn, c) {
    return /*#__PURE__*/_react.default.createElement(_router2.LocationProvider, {
      key: "location.provider",
      history: (0, _router.createHistory)((0, _router.createMemorySource)('/?path=/story/story--id'))
    }, /*#__PURE__*/_react.default.createElement(_router2.Location, {
      key: "location.consumer"
    }, function (locationData) {
      return /*#__PURE__*/_react.default.createElement(_api.Provider, _extends({
        key: "manager",
        provider: provider
      }, locationData, {
        docsMode: false
      }), /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
        key: "theme.provider",
        theme: (0, _theming.ensure)(_theming.themes.light)
      }, /*#__PURE__*/_react.default.createElement(StoryFn, c)));
    }));
  }]
};
exports.default = _default;

var noTabs = function noTabs() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref) {
    var api = _ref.api;
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, _preview2.previewProps, {
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

exports.noTabs = noTabs;
noTabs.displayName = "noTabs";

var hideFullscreen = function hideFullscreen() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref2) {
    var api = _ref2.api;
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, _preview2.previewProps, {
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

exports.hideFullscreen = hideFullscreen;
hideFullscreen.displayName = "hideFullscreen";

var hideAllDefaultTools = function hideAllDefaultTools() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref3) {
    var api = _ref3.api;
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, _preview2.previewProps, {
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

exports.hideAllDefaultTools = hideAllDefaultTools;
hideAllDefaultTools.displayName = "hideAllDefaultTools";

var withCanvasTab = function withCanvasTab() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref4) {
    var api = _ref4.api;
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, _preview2.previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
      })
    }));
  });
};

exports.withCanvasTab = withCanvasTab;
withCanvasTab.displayName = "withCanvasTab";

var withTabs = function withTabs() {
  return /*#__PURE__*/_react.default.createElement(_preview.Preview, _preview2.previewProps);
};

exports.withTabs = withTabs;
withTabs.displayName = "withTabs";