import React from 'react';
import { StorybookLogo } from './StorybookLogo';
export default {
  component: StorybookLogo,
  title: 'Basics/Brand/StorybookLogo'
};
export var normal = function normal() {
  return /*#__PURE__*/React.createElement(StorybookLogo, {
    alt: "Storybook logo"
  });
};
normal.displayName = "normal";