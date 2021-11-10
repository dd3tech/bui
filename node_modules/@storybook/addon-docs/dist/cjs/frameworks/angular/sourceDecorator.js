"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceDecorator = exports.skipSourceRender = void 0;

var _addons = require("@storybook/addons");

var _renderer = require("@storybook/angular/renderer");

var _parserHtml = _interopRequireDefault(require("prettier/parser-html"));

var _standalone = _interopRequireDefault(require("prettier/standalone"));

var _shared = require("../../shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var skipSourceRender = function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code


  return (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.CODE;
};

exports.skipSourceRender = skipSourceRender;

var prettyUp = function prettyUp(source) {
  return _standalone.default.format(source, {
    parser: 'angular',
    plugins: [_parserHtml.default],
    htmlWhitespaceSensitivity: 'ignore'
  });
};
/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context  StoryContext
 */


var sourceDecorator = function sourceDecorator(storyFn, context) {
  var story = storyFn();

  if (skipSourceRender(context)) {
    return story;
  }

  var channel = _addons.addons.getChannel();

  var props = story.props,
      template = story.template;
  var _context$parameters = context.parameters,
      component = _context$parameters.component,
      argTypes = _context$parameters.argTypes;

  if (component) {
    var source = (0, _renderer.computesTemplateSourceFromComponent)(component, props, argTypes); // We might have a story with a Directive or Service defined as the component
    // In these cases there might exist a template, even if we aren't able to create source from component

    if (source || template) {
      channel.emit(_shared.SNIPPET_RENDERED, context.id, prettyUp(source || template));
    }

    return story;
  }

  if (template) {
    channel.emit(_shared.SNIPPET_RENDERED, context.id, prettyUp(template));
    return story;
  }

  return story;
};

exports.sourceDecorator = sourceDecorator;