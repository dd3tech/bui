"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.missingStory = exports.workingStory = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iframe = require("./iframe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _iframe.IFrame,
  title: 'UI/Iframe'
};
exports.default = _default;
var style = {
  width: '500px',
  height: '500px',
  border: '2px solid hotpink',
  position: 'relative'
};

var workingStory = function workingStory() {
  return /*#__PURE__*/_react.default.createElement(_iframe.IFrame, {
    active: true,
    id: "iframe",
    title: "Missing",
    src: "/iframe.html?id=ui-panel--default",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};

exports.workingStory = workingStory;
workingStory.displayName = "workingStory";
workingStory.parameters = {
  chromatic: {
    disable: true
  }
};

var missingStory = function missingStory() {
  return /*#__PURE__*/_react.default.createElement(_iframe.IFrame, {
    active: true,
    id: "iframe",
    title: "Missing",
    src: "/iframe.html?id=missing",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};

exports.missingStory = missingStory;
missingStory.displayName = "missingStory";