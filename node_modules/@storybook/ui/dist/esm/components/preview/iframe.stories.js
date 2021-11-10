import React from 'react';
import { IFrame } from './iframe';
export default {
  component: IFrame,
  title: 'UI/Iframe'
};
var style = {
  width: '500px',
  height: '500px',
  border: '2px solid hotpink',
  position: 'relative'
};
export var workingStory = function workingStory() {
  return /*#__PURE__*/React.createElement(IFrame, {
    active: true,
    id: "iframe",
    title: "Missing",
    src: "/iframe.html?id=ui-panel--default",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};
workingStory.displayName = "workingStory";
workingStory.parameters = {
  chromatic: {
    disable: true
  }
};
export var missingStory = function missingStory() {
  return /*#__PURE__*/React.createElement(IFrame, {
    active: true,
    id: "iframe",
    title: "Missing",
    src: "/iframe.html?id=missing",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};
missingStory.displayName = "missingStory";