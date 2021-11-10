"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.argTypesEnhancers = exports.parameters = void 0;

var _blocks = require("../../blocks");

var _enhanceArgTypes = require("./enhanceArgTypes");

var parameters = {
  docs: {
    inlineStories: false,
    container: _blocks.DocsContainer,
    page: _blocks.DocsPage,
    iframeHeight: 100
  }
};
exports.parameters = parameters;
var argTypesEnhancers = [_enhanceArgTypes.enhanceArgTypes];
exports.argTypesEnhancers = argTypesEnhancers;