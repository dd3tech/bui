import React from 'react';
import { Typeset } from './Typeset';
export default {
  title: 'Docs/Typeset',
  component: Typeset
};
var fontSizes = ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px'];
var fontWeight = 900;
var fontFamily = 'monospace';
export var withFontSizes = function withFontSizes() {
  return /*#__PURE__*/React.createElement(Typeset, {
    fontSizes: fontSizes
  });
};
withFontSizes.displayName = "withFontSizes";
export var withFontWeight = function withFontWeight() {
  return /*#__PURE__*/React.createElement(Typeset, {
    fontSizes: fontSizes,
    fontWeight: fontWeight
  });
};
withFontWeight.displayName = "withFontWeight";
export var withFontFamily = function withFontFamily() {
  return /*#__PURE__*/React.createElement(Typeset, {
    fontSizes: fontSizes,
    fontFamily: fontFamily
  });
};
withFontFamily.displayName = "withFontFamily";
export var withWeightText = function withWeightText() {
  return /*#__PURE__*/React.createElement(Typeset, {
    fontSizes: fontSizes,
    fontWeight: fontWeight,
    sampleText: "Heading"
  });
};
withWeightText.displayName = "withWeightText";