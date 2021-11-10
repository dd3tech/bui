"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = void 0;

require("core-js/modules/es.array.concat.js");

var _react = _interopRequireDefault(require("react"));

var _client = require("@storybook/core/client");

require("./globals");

var _render = _interopRequireDefault(require("./render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */
var framework = 'react';

var globalRender = function globalRender(args, _ref) {
  var parameters = _ref.parameters;
  var Component = parameters.component;
  return /*#__PURE__*/_react.default.createElement(Component, args);
};

var api = (0, _client.start)(_render.default);
api.clientApi.globalRender = globalRender;

var storiesOf = function storiesOf(kind, m) {
  return api.clientApi.storiesOf(kind, m).addParameters({
    framework: framework
  });
};

exports.storiesOf = storiesOf;

var configure = function configure() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return api.configure.apply(api, [framework].concat(args));
};

exports.configure = configure;
var addDecorator = api.clientApi.addDecorator;
exports.addDecorator = addDecorator;
var addParameters = api.clientApi.addParameters;
exports.addParameters = addParameters;
var clearDecorators = api.clientApi.clearDecorators;
exports.clearDecorators = clearDecorators;
var setAddon = api.clientApi.setAddon;
exports.setAddon = setAddon;
var forceReRender = api.forceReRender;
exports.forceReRender = forceReRender;
var getStorybook = api.clientApi.getStorybook;
exports.getStorybook = getStorybook;
var raw = api.clientApi.raw;
exports.raw = raw;