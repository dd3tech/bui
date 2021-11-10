"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOutlineStyles = exports.clearStyles = void 0;

var clearStyles = function clearStyles(selector) {
  var selectors = Array.isArray(selector) ? selector : [selector];
  selectors.forEach(clearStyle);
};

exports.clearStyles = clearStyles;

var clearStyle = function clearStyle(selector) {
  var element = document.getElementById(selector);

  if (element && element.parentElement) {
    element.parentElement.removeChild(element);
  }
};

var addOutlineStyles = function addOutlineStyles(selector, css) {
  var existingStyle = document.getElementById(selector);

  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    var style = document.createElement('style');
    style.setAttribute('id', selector);
    style.innerHTML = css;
    document.head.appendChild(style);
  }
};

exports.addOutlineStyles = addOutlineStyles;