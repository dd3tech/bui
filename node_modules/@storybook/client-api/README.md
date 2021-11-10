# `@storybook/client-api` -- APIs that control the rendering of stories in the preview iframe.

## Story store

The story store contains the list of stories loaded in a Storybook.

Each story is loaded via the `.add()` API and contains the follow attributes, which are available on the `context` (which is passed to the story's render function and decorators):

- `kind` - the grouping of the story, typically corresponds to a single component. Also known as the `title` in CSF.
- `name` - the name of the specific story.
- `id` - an unique, URL sanitized identifier for the story, created from the `kind` and `name`.
- `parameters` - static data about the story, see below.
- `args` - dynamic inputs to the story, see below.
- `hooks` - listeners that will rerun when the story changes or is unmounted, see `@storybook/addons`.
- `viewMode` - property that tells if the story is being rendered in Canvas or Docs tab. Values are `story` for canvas and `docs` for docs.

## Parameters

The story parameters is a static, serializable object of data that provides details about the story. Those details can be used by addons or Storybook itself to render UI or provide defaults about the story rendering.

Parameters _cannot change_ and are synchronized to the manager once when the story is loaded (note over the lifetime of a development Storybook a story can be loaded several times due to hot module reload, so the parameters technically can change for that reason).

Usually addons will read from a single key of `parameters` namespaced by the name of that addon. For instance the configuration of the `backgrounds` addon is driven by the `parameters.backgrounds` namespace.

Parameters are inheritable -- you can set global parameters via `addParameters` (exported by `client_api` and each framework), at the component level by the `parameters` key of the component (default) export in CSF (or in `.storiesOf`), and on a single story via the `parameters` key on the story data, or the third argument to `.add()`.

Some notable parameters:

- `parameters.fileName` - the file that the story was defined in, when available
- `parameters.argsTypes` - type information about args (see below)

### Parameter enhancement

Ideally all parameters should be set _at build time_ of the Storybook, either directly by the user, or via the use of a webpack loader. (For an example of this, see `addon-storysource`, which writes to the `parameters.storysource` parameter with a set of static information about the story file).

However, in some cases it is necessary to set parameters at _load time_ when the Storybook first loads. This should be avoided if at all possible as it is cost that must be paid each time a Storybook loads, rather than just once when the Storybook is built.

To add a parameter enhancer, call `store.addArgTypesEnhancer(enhancer)` _before_ any stories are loaded (in addon registration or in `preview.js`). As each story is loaded, the enhancer will be called with the full story `context` -- the return value should be an object that will be patched into the Story's `argTypes`.

There is a default enhancer that ensures that each `arg` in a story has a baseline `argType`. This value can be improved by subsequent enhancers, e.g. those provided by `@storybook/addon-docs`.

## Args

Args are "inputs" to stories.

You can think of them equivalently to React props, Angular inputs and outputs, etc.

Changing the args cause the story to be re-rendered with the new set of args.

### Using args in a story

By default (starting in 6.0) the args will be passed to the story as first argument and the context as second:

```js
const YourStory = ({ x, y } /*, context*/) => /* render your story using `x` and `y` */
```

If you set the `parameters.options.passArgsFirst` option on a story to false, args are passed to a story in the context, preserving the pre-6.0 story API; like parameters, they are available as `context.args`.

```js
const YourStory = ({ args: { x, y }}) => /* render your story using `x` and `y` */
```

### Arg types and values

Arg types are used by the docs addon to populate the props table and are documented there. They are controlled by `parameters.argTypes` and can (sometimes) be automatically inferred from type information about the story or the component rendered by the story.

A story can set initial values of its args with the `parameters.args` parameter. If you set an initial value for an arg that doesn't have a type a simple type will be inferred from the value.

The initial value for an arg named "X" will be either `parameters.args.X` (if set) or `parameters.argTypes.X.defaultValue`. If an arg doesn't have a default value or an initial value, it will start unset, although it can still be set later via user interaction.

For instance, for this story:

```js
export MyStory = ....
MyStory.argTypes = {
  primary: { defaultValue: true, /* other things */ },
  size: { /* other things */ },
  color: { /* other things */ },
};
MyStory.args = {
  size: 'large',
  extra: 'prop',
};
```

Then `context.args` will default to `{ primary: true, size: 'large', extra: 'prop' }`.

### Using args in an addon

Args values are automatically synchronized (via the `changeStoryArgs` and `storyArgsChanged` events) between the preview and manager; APIs exist in `lib/api` to read and set args in the manager.

Args need to be serializable -- so currently cannot include callbacks (this may change in a future version).

Note that arg values are passed directly to a story -- you should only store the actual value that the story needs to render in the arg. If you need more complex information supporting that, use parameters or addon state.

Both `@storybook/client-api` (preview) and `@storybook/api` (manager) export a `useArgs()` hook that you can use to access args in decorators or addon panels. The API is as follows:

```js
import { useArgs } from '@storybook/client-api'; // or '@storybook/api'

// `args` is the args of the currently rendered story
// `updateArgs` will update its args. You can pass a subset of the args; other args will not be changed.
const [args, updateArgs] = useArgs();
```

## Global Args

Global args are args that are "global" across all stories. They are used for things like themes and internationalization (i18n) in stories, where you want Storybook to "remember" your setting as you browse between stories.

### Initial values of global args

To set initial values of global args, set the `parameters.globals` parameters. Addons can use parameter enhancers (see above) to do this.

### Using global args in an addon

Similar to args, global args are synchronized to the manager and can be accessed via the `useGlobals` hook.

```js
import { useGlobals } from '@storybook/client-api'; // or '@storybook/api'

const [globals, updateGlobals] = useGlobals();
```
