"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingState = exports.Default = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _router = require("@reach/router");

var _index = require("./index");

var _FakeProvider = require("./FakeProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'UI/App',
  component: _index.Root,
  parameters: {
    layout: 'fullscreen'
  }
};
exports.default = _default;
var history = (0, _router.createHistory)((0, _router.createMemorySource)('/?path=/story/story--id'));

var Default = function Default() {
  return /*#__PURE__*/_react.default.createElement(_index.Root, {
    provider: new _FakeProvider.FakeProvider(),
    history: history
  });
};

exports.Default = Default;
Default.displayName = "Default";

var LoadingState = function LoadingState() {
  return /*#__PURE__*/_react.default.createElement(_index.Root, {
    provider: new _FakeProvider.PrettyFakeProvider(),
    history: history
  });
};

exports.LoadingState = LoadingState;
LoadingState.displayName = "LoadingState";