function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Fragment } from 'react';
import { styled } from '@storybook/theming';
import { FlexBar } from '../bar/bar';
import { Icons } from '../icon/icon';
import { IconButton } from '../bar/button';

const Zoom = ({
  zoom,
  resetZoom
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
  key: "zoomin",
  onClick: e => {
    e.preventDefault();
    zoom(0.8);
  },
  title: "Zoom in"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "zoom"
})), /*#__PURE__*/React.createElement(IconButton, {
  key: "zoomout",
  onClick: e => {
    e.preventDefault();
    zoom(1.25);
  },
  title: "Zoom out"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "zoomout"
})), /*#__PURE__*/React.createElement(IconButton, {
  key: "zoomreset",
  onClick: e => {
    e.preventDefault();
    resetZoom();
  },
  title: "Reset zoom"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "zoomreset"
})));

const Eject = ({
  baseUrl,
  storyId
}) => /*#__PURE__*/React.createElement(IconButton, {
  key: "opener",
  href: `${baseUrl}?id=${storyId}`,
  target: "_blank",
  title: "Open canvas in new tab"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "share"
}));

Eject.displayName = "Eject";
const Bar = styled(FlexBar)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  transition: 'transform .2s linear'
});
export const Toolbar = (_ref) => {
  let {
    storyId,
    baseUrl,
    zoom,
    resetZoom
  } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, ["storyId", "baseUrl", "zoom", "resetZoom"]);

  return /*#__PURE__*/React.createElement(Bar, rest, /*#__PURE__*/React.createElement(Fragment, {
    key: "left"
  }, /*#__PURE__*/React.createElement(Zoom, {
    zoom,
    resetZoom
  })), /*#__PURE__*/React.createElement(Fragment, {
    key: "right"
  }, storyId && /*#__PURE__*/React.createElement(Eject, {
    storyId,
    baseUrl
  })));
};
Toolbar.displayName = "Toolbar";