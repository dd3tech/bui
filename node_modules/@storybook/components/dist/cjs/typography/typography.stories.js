"use strict";

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _react2 = require("@storybook/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Info = _theming.styled.div({
  marginBottom: '3rem'
});

var Heading1 = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontSize: theme.typography.size.l3
  };
});

var Heading2 = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    fontSize: theme.typography.size.l2
  };
});

var Heading3 = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontSize: theme.typography.size.l1
  };
});

var Heading4 = _theming.styled.div(function (_ref4) {
  var theme = _ref4.theme;
  return {
    fontSize: theme.typography.size.m3
  };
});

var Heading5 = _theming.styled.div(function (_ref5) {
  var theme = _ref5.theme;
  return {
    fontSize: theme.typography.size.m3
  };
});

var Heading6 = _theming.styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    fontSize: theme.typography.size.m1
  };
});

var Heading7 = _theming.styled.div(function (_ref7) {
  var theme = _ref7.theme;
  return {
    fontSize: theme.typography.size.s3
  };
});

var Heading8 = _theming.styled.div(function (_ref8) {
  var theme = _ref8.theme;
  return {
    fontSize: theme.typography.size.s2
  };
});

var Heading9 = _theming.styled.div(function (_ref9) {
  var theme = _ref9.theme;
  return {
    fontSize: theme.typography.size.s1
  };
});

var HeadingWrapper = _theming.styled.div(function (_ref10) {
  var theme = _ref10.theme;
  return {
    fontWeight: theme.typography.weight.black,
    '> *': {
      marginBottom: '1rem'
    }
  };
});

var Type1 = _theming.styled.div(function (_ref11) {
  var theme = _ref11.theme;
  return {
    fontSize: theme.typography.size.s3
  };
});

var Type2 = _theming.styled.div(function (_ref12) {
  var theme = _ref12.theme;
  return {
    fontSize: theme.typography.size.s2
  };
});

var Type3 = _theming.styled.div(function (_ref13) {
  var theme = _ref13.theme;
  return {
    fontSize: theme.typography.size.s1
  };
});

var TypeWrapper = _theming.styled.div({
  '> *': {
    marginBottom: '1rem'
  }
});

var Wrapper = _theming.styled.div({
  display: 'flex',
  flexDirection: 'row',
  '> *': {
    flex: 1,
    paddingRight: 40
  }
});

var Page = _theming.styled.div({
  padding: '3rem'
});

(0, _react2.storiesOf)('Basics/typography', module).add('all', function () {
  return /*#__PURE__*/_react.default.createElement(Page, null, /*#__PURE__*/_react.default.createElement(Info, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "Font-family:"), " \"Nunito sans\", Apple system font ... sans-serif"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "UI text size:"), " 13px"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "Document/Markdown text size:"), " 14px"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "Code font:"), " ", /*#__PURE__*/_react.default.createElement("code", null, "Operator Mono, Fira Code, Consolas ... monospace")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "Weights:"), " 400(normal), 600(bold), 900(black)")), /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(HeadingWrapper, null, /*#__PURE__*/_react.default.createElement(Heading1, null, "48 heading"), /*#__PURE__*/_react.default.createElement(Heading2, null, "40 heading"), /*#__PURE__*/_react.default.createElement(Heading3, null, "32 heading"), /*#__PURE__*/_react.default.createElement(Heading4, null, "28 heading"), /*#__PURE__*/_react.default.createElement(Heading5, null, "24 heading"), /*#__PURE__*/_react.default.createElement(Heading6, null, "20 heading"), /*#__PURE__*/_react.default.createElement(Heading7, null, "16 heading"), /*#__PURE__*/_react.default.createElement(Heading8, null, "14 heading"), /*#__PURE__*/_react.default.createElement(Heading9, null, "12 heading")), /*#__PURE__*/_react.default.createElement(TypeWrapper, null, /*#__PURE__*/_react.default.createElement(Type1, null, "16 The quick brown fox jumps over the lazy dog"), /*#__PURE__*/_react.default.createElement(Type2, null, "14 The quick brown fox jumps over the lazy dog"), /*#__PURE__*/_react.default.createElement(Type3, null, "12 The quick brown fox jumps over the lazy dog"))));
});