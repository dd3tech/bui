# Storybook Core-Client

This package contains browser-side functionality shared amongst all the frameworks (React, RN, Vue, Ember, Angular, etc).

## Preview

The files in `src/preview` alongside the `@storybook/client-api` package form the "API" of the preview (iframe) side of Storybook. Here is a brief overview of the architecture:

Each framework (e.g. `@storybook/react` / `@storybook/angular` / et al.) initializes the preview by calling into `src/preview/start.ts`, passing a `render` function that will be used to render stories.

The `start` module initializes all the submodules:

- `StoryStore` (from `@storybook/client-api`) - stores the stories and their state as well as the current selection or error.
- `ClientApi` (from `@storybook/client-api`) - provides the entry point for `storiesOf()` API calls; re-exported by each framework.
- `ConfigApi` (from `@storybook/client-api`) - provides the configure API (wrapped by `loadCsf` below).
- `StoryRenderer` - controls the HTML that is rendered in the preview (calling the `render` function with the current story at appropriate times).
- `url.js` - controls the URL in the preview and sets the selection based on it.
- `loadCsf` - loads CSF files from `require.context()` calls and uses `ClientApi` to load them into the store.

Each module uses the channel to communicate with each other and the manager. Each module also has direct access to the story store.

### Events on startup

The store can only be changed during "configuration". The `ConfigApi` will call `store.startConfiguration()`, then the user code (or `loadCsf`'s loader) which will use client API to load up stories. At the end of the user's code the `ConfigApi` will call `store.finishConfiguration()`. At this point the `SET_STORIES` event is emitted and the stories are transmitted to the manager.

The URL of the preview is a "selection specifier" that controls the initial selection, which is chosen when configuration ends. Also (outside of configuration) the `SET_CURRENT_STORY` "command" event can be used to set the selection on the store. When the selection is set, a `CURRENT_STORY_WAS_SET` event is emitted which triggers a rendering.
