import React from 'react';
import { styled } from '@storybook/theming';
import { storiesOf } from '@storybook/react';
const Info = styled.div({
  marginBottom: '3rem'
});
const Heading1 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.l3
}));
const Heading2 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.l2
}));
const Heading3 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.l1
}));
const Heading4 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.m3
}));
const Heading5 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.m3
}));
const Heading6 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.m1
}));
const Heading7 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s3
}));
const Heading8 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s2
}));
const Heading9 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s1
}));
const HeadingWrapper = styled.div(({
  theme
}) => ({
  fontWeight: theme.typography.weight.black,
  '> *': {
    marginBottom: '1rem'
  }
}));
const Type1 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s3
}));
const Type2 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s2
}));
const Type3 = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s1
}));
const TypeWrapper = styled.div({
  '> *': {
    marginBottom: '1rem'
  }
});
const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  '> *': {
    flex: 1,
    paddingRight: 40
  }
});
const Page = styled.div({
  padding: '3rem'
});
storiesOf('Basics/typography', module).add('all', () => /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Font-family:"), " \"Nunito sans\", Apple system font ... sans-serif"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "UI text size:"), " 13px"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Document/Markdown text size:"), " 14px"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Code font:"), " ", /*#__PURE__*/React.createElement("code", null, "Operator Mono, Fira Code, Consolas ... monospace")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Weights:"), " 400(normal), 600(bold), 900(black)")), /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(HeadingWrapper, null, /*#__PURE__*/React.createElement(Heading1, null, "48 heading"), /*#__PURE__*/React.createElement(Heading2, null, "40 heading"), /*#__PURE__*/React.createElement(Heading3, null, "32 heading"), /*#__PURE__*/React.createElement(Heading4, null, "28 heading"), /*#__PURE__*/React.createElement(Heading5, null, "24 heading"), /*#__PURE__*/React.createElement(Heading6, null, "20 heading"), /*#__PURE__*/React.createElement(Heading7, null, "16 heading"), /*#__PURE__*/React.createElement(Heading8, null, "14 heading"), /*#__PURE__*/React.createElement(Heading9, null, "12 heading")), /*#__PURE__*/React.createElement(TypeWrapper, null, /*#__PURE__*/React.createElement(Type1, null, "16 The quick brown fox jumps over the lazy dog"), /*#__PURE__*/React.createElement(Type2, null, "14 The quick brown fox jumps over the lazy dog"), /*#__PURE__*/React.createElement(Type3, null, "12 The quick brown fox jumps over the lazy dog")))));