import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled, ThemeProvider, convert, themes } from '@storybook/theming';
import { EmptyBlock } from './EmptyBlock';
import { SyntaxHighlighter } from '../syntaxhighlighter/lazy-syntaxhighlighter';
var StyledSyntaxHighlighter = styled(SyntaxHighlighter)(function (_ref) {
  var theme = _ref.theme;
  return {
    // DocBlocks-specific styling and overrides
    fontSize: "".concat(theme.typography.size.s2 - 1, "px"),
    lineHeight: '19px',
    margin: '25px 0 40px',
    borderRadius: theme.appBorderRadius,
    boxShadow: theme.base === 'light' ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0' : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
    'pre.prismjs': {
      padding: 20,
      background: 'inherit'
    }
  };
});
export var SourceError;

(function (SourceError) {
  SourceError["NO_STORY"] = "There\u2019s no story here.";
  SourceError["SOURCE_UNAVAILABLE"] = "Oh no! The source is not available.";
})(SourceError || (SourceError = {}));

/**
 * Syntax-highlighted source code for a component (or anything!)
 */
var Source = function Source(props) {
  var _ref2 = props,
      error = _ref2.error;

  if (error) {
    return /*#__PURE__*/React.createElement(EmptyBlock, null, error);
  }

  var _ref3 = props,
      language = _ref3.language,
      code = _ref3.code,
      dark = _ref3.dark,
      format = _ref3.format,
      rest = _objectWithoutProperties(_ref3, ["language", "code", "dark", "format"]);

  var syntaxHighlighter = /*#__PURE__*/React.createElement(StyledSyntaxHighlighter, _extends({
    bordered: true,
    copyable: true,
    format: format,
    language: language,
    className: "docblock-source"
  }, rest), code);

  if (typeof dark === 'undefined') {
    return syntaxHighlighter;
  }

  var overrideTheme = dark ? themes.dark : themes.light;
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: convert(overrideTheme)
  }, syntaxHighlighter);
};

Source.displayName = "Source";
Source.defaultProps = {
  format: false
};
export { Source, StyledSyntaxHighlighter };