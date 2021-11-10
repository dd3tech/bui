import "core-js/modules/es.array.reduce.js";

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {},
  args: {},
  argTypes: {},
  globals: {}
};
export const decorateStory = (storyFn, decorator, bindWithContext) => {
  // Bind the partially decorated storyFn so that when it is called it always knows about the story context,
  // no matter what it is passed directly. This is because we cannot guarantee a decorator will
  // pass the context down to the next decorated story in the chain.
  const boundStoryFunction = bindWithContext(storyFn);
  return context => decorator(boundStoryFunction, context);
};
export const defaultDecorateStory = (storyFn, decorators) => {
  // We use a trick to avoid recreating the bound story function inside `decorateStory`.
  // Instead we pass it a context "getter", which is defined once (at "decoration time")
  // The getter reads a variable which is scoped to this call of `decorateStory`
  // (ie to this story), so there is no possibility of overlap.
  // This will break if you call the same story twice interleaved
  // (React might do it if you rendered the same story twice in the one ReactDom.render call, for instance)
  const contextStore = {
    value: defaultContext
  };
  /**
   * When you call the story function inside a decorator, e.g.:
   *
   * ```jsx
   * <div>{storyFn({ foo: 'bar' })}</div>
   * ```
   *
   * This will override the `foo` property on the `innerContext`, which gets
   * merged in with the default context
   */

  const bindWithContext = decoratedStoryFn => // (NOTE: You cannot override the parameters key, it is fixed)
  (_ref = {}) => {
    let contextUpdate = _objectWithoutPropertiesLoose(_ref, ["id", "name", "kind", "parameters"]);

    contextStore.value = Object.assign({}, contextStore.value, contextUpdate);
    return decoratedStoryFn(contextStore.value);
  };

  const decoratedWithContextStore = decorators.reduce((story, decorator) => decorateStory(story, decorator, bindWithContext), storyFn);
  return (context = defaultContext) => {
    contextStore.value = context;
    return decoratedWithContextStore(context); // Pass the context directly into the first decorator
  };
};