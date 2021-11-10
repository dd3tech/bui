import { addons } from '@storybook/addons';
import { computesTemplateSourceFromComponent } from '@storybook/angular/renderer';
import prettierHtml from 'prettier/parser-html';
import prettier from 'prettier/standalone';
import { SNIPPET_RENDERED, SourceType } from '../../shared';
export var skipSourceRender = function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code


  return (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
};

var prettyUp = function prettyUp(source) {
  return prettier.format(source, {
    parser: 'angular',
    plugins: [prettierHtml],
    htmlWhitespaceSensitivity: 'ignore'
  });
};
/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context  StoryContext
 */


export var sourceDecorator = function sourceDecorator(storyFn, context) {
  var story = storyFn();

  if (skipSourceRender(context)) {
    return story;
  }

  var channel = addons.getChannel();
  var props = story.props,
      template = story.template;
  var _context$parameters = context.parameters,
      component = _context$parameters.component,
      argTypes = _context$parameters.argTypes;

  if (component) {
    var source = computesTemplateSourceFromComponent(component, props, argTypes); // We might have a story with a Directive or Service defined as the component
    // In these cases there might exist a template, even if we aren't able to create source from component

    if (source || template) {
      channel.emit(SNIPPET_RENDERED, context.id, prettyUp(source || template));
    }

    return story;
  }

  if (template) {
    channel.emit(SNIPPET_RENDERED, context.id, prettyUp(template));
    return story;
  }

  return story;
};