import React from 'react';
import { EmptyBlock } from './EmptyBlock';
export default {
  title: 'Docs/EmptyBlock',
  component: EmptyBlock
};
export var error = function error() {
  return /*#__PURE__*/React.createElement(EmptyBlock, null, "Generic error message");
};
error.displayName = "error";