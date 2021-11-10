import React from 'react';
import { Typeset } from './Typeset';
export default {
  title: 'Docs/Typeset',
  component: Typeset
};
const fontSizes = ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px'];
const fontWeight = 900;
const fontFamily = 'monospace';
export const withFontSizes = () => /*#__PURE__*/React.createElement(Typeset, {
  fontSizes: fontSizes
});
withFontSizes.displayName = "withFontSizes";
export const withFontWeight = () => /*#__PURE__*/React.createElement(Typeset, {
  fontSizes: fontSizes,
  fontWeight: fontWeight
});
withFontWeight.displayName = "withFontWeight";
export const withFontFamily = () => /*#__PURE__*/React.createElement(Typeset, {
  fontSizes: fontSizes,
  fontFamily: fontFamily
});
withFontFamily.displayName = "withFontFamily";
export const withWeightText = () => /*#__PURE__*/React.createElement(Typeset, {
  fontSizes: fontSizes,
  fontWeight: fontWeight,
  sampleText: "Heading"
});
withWeightText.displayName = "withWeightText";