import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled, isPropValid } from '@storybook/theming';

var ButtonOrLink = function ButtonOrLink(_ref) {
  var children = _ref.children,
      restProps = _objectWithoutProperties(_ref, ["children"]);

  return restProps.href != null ? /*#__PURE__*/React.createElement("a", restProps, children) : /*#__PURE__*/React.createElement("button", _extends({
    type: "button"
  }, restProps), children);
};

export var TabButton = styled(ButtonOrLink, {
  shouldForwardProp: isPropValid
})({
  whiteSpace: 'normal',
  display: 'inline-flex',
  overflow: 'hidden',
  verticalAlign: 'top',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  textDecoration: 'none',
  '&:empty': {
    display: 'none'
  }
}, function (_ref2) {
  var theme = _ref2.theme;
  return {
    padding: '0 15px',
    transition: 'color 0.2s linear, border-bottom-color 0.2s linear',
    height: 40,
    lineHeight: '12px',
    cursor: 'pointer',
    background: 'transparent',
    border: '0 solid transparent',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    fontWeight: 'bold',
    fontSize: 13,
    '&:focus': {
      outline: '0 none',
      borderBottomColor: theme.color.secondary
    }
  };
}, function (_ref3) {
  var active = _ref3.active,
      textColor = _ref3.textColor,
      theme = _ref3.theme;
  return active ? {
    color: textColor || theme.barSelectedColor,
    borderBottomColor: theme.barSelectedColor
  } : {
    color: textColor || theme.barTextColor,
    borderBottomColor: 'transparent'
  };
});
TabButton.displayName = 'TabButton';
export var IconButton = styled(ButtonOrLink, {
  shouldForwardProp: isPropValid
})(function (_ref4) {
  var theme = _ref4.theme;
  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    background: 'none',
    color: 'inherit',
    padding: 0,
    cursor: 'pointer',
    // Icon Buttons may have text depending on user preferences.
    // While we don't recommend having text for IconButtons, this style ensures that the text is the correct size.
    fontWeight: 'bold',
    fontSize: 13,
    border: '0 solid transparent',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    transition: 'color 0.2s linear, border-bottom-color 0.2s linear',
    '&:hover, &:focus': {
      outline: '0 none',
      color: theme.color.secondary
    },
    '& > svg': {
      width: 15
    }
  };
}, function (_ref5) {
  var active = _ref5.active,
      theme = _ref5.theme;
  return active ? {
    outline: '0 none',
    borderBottomColor: theme.color.secondary
  } : {};
});
IconButton.displayName = 'IconButton';