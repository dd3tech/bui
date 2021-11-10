function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled, ThemeProvider, convert, themes } from '@storybook/theming';
import { EmptyBlock } from './EmptyBlock';
import { SyntaxHighlighter } from '../syntaxhighlighter/lazy-syntaxhighlighter';
const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({
  theme
}) => ({
  // DocBlocks-specific styling and overrides
  fontSize: `${theme.typography.size.s2 - 1}px`,
  lineHeight: '19px',
  margin: '25px 0 40px',
  borderRadius: theme.appBorderRadius,
  boxShadow: theme.base === 'light' ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0' : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
  'pre.prismjs': {
    padding: 20,
    background: 'inherit'
  }
}));
export let SourceError;

(function (SourceError) {
  SourceError["NO_STORY"] = "There\u2019s no story here.";
  SourceError["SOURCE_UNAVAILABLE"] = "Oh no! The source is not available.";
})(SourceError || (SourceError = {}));

/**
 * Syntax-highlighted source code for a component (or anything!)
 */
const Source = props => {
  const {
    error
  } = props;

  if (error) {
    return /*#__PURE__*/React.createElement(EmptyBlock, null, error);
  }

  const _ref = props,
        {
    language,
    code,
    dark,
    format
  } = _ref,
        rest = _objectWithoutPropertiesLoose(_ref, ["language", "code", "dark", "format"]);

  const syntaxHighlighter = /*#__PURE__*/React.createElement(StyledSyntaxHighlighter, _extends({
    bordered: true,
    copyable: true,
    format: format,
    language: language,
    className: "docblock-source"
  }, rest), code);

  if (typeof dark === 'undefined') {
    return syntaxHighlighter;
  }

  const overrideTheme = dark ? themes.dark : themes.light;
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: convert(overrideTheme)
  }, syntaxHighlighter);
};

Source.displayName = "Source";
Source.defaultProps = {
  format: false
};
export { Source, StyledSyntaxHighlighter };