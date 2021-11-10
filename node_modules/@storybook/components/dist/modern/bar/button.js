function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled, isPropValid } from '@storybook/theming';

const ButtonOrLink = (_ref) => {
  let {
    children
  } = _ref,
      restProps = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return restProps.href != null ? /*#__PURE__*/React.createElement("a", restProps, children) : /*#__PURE__*/React.createElement("button", _extends({
    type: "button"
  }, restProps), children);
};

export const TabButton = styled(ButtonOrLink, {
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
}, ({
  theme
}) => ({
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
}), ({
  active,
  textColor,
  theme
}) => active ? {
  color: textColor || theme.barSelectedColor,
  borderBottomColor: theme.barSelectedColor
} : {
  color: textColor || theme.barTextColor,
  borderBottomColor: 'transparent'
});
TabButton.displayName = 'TabButton';
export const IconButton = styled(ButtonOrLink, {
  shouldForwardProp: isPropValid
})(({
  theme
}) => ({
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
}), ({
  active,
  theme
}) => active ? {
  outline: '0 none',
  borderBottomColor: theme.color.secondary
} : {});
IconButton.displayName = 'IconButton';