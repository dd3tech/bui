var events; // Enables: `import Events from ...`

(function (events) {
  events["CHANNEL_CREATED"] = "channelCreated";
  events["STORY_SPECIFIED"] = "storySpecified";
  events["SET_STORIES"] = "setStories";
  events["SET_CURRENT_STORY"] = "setCurrentStory";
  events["CURRENT_STORY_WAS_SET"] = "currentStoryWasSet";
  events["FORCE_RE_RENDER"] = "forceReRender";
  events["STORY_CHANGED"] = "storyChanged";
  events["STORY_UNCHANGED"] = "storyUnchanged";
  events["STORY_RENDERED"] = "storyRendered";
  events["STORY_MISSING"] = "storyMissing";
  events["STORY_ERRORED"] = "storyErrored";
  events["STORY_THREW_EXCEPTION"] = "storyThrewException";
  events["UPDATE_STORY_ARGS"] = "updateStoryArgs";
  events["STORY_ARGS_UPDATED"] = "storyArgsUpdated";
  events["RESET_STORY_ARGS"] = "resetStoryArgs";
  events["UPDATE_GLOBALS"] = "updateGlobals";
  events["GLOBALS_UPDATED"] = "globalsUpdated";
  events["REGISTER_SUBSCRIPTION"] = "registerSubscription";
  events["PREVIEW_KEYDOWN"] = "previewKeydown";
  events["SELECT_STORY"] = "selectStory";
  events["STORIES_COLLAPSE_ALL"] = "storiesCollapseAll";
  events["STORIES_EXPAND_ALL"] = "storiesExpandAll";
  events["DOCS_RENDERED"] = "docsRendered";
  events["SHARED_STATE_CHANGED"] = "sharedStateChanged";
  events["SHARED_STATE_SET"] = "sharedStateSet";
  events["NAVIGATE_URL"] = "navigateUrl";
})(events || (events = {}));

export default events; // Enables: `import * as Events from ...` or `import { CHANNEL_CREATED } as Events from ...`
// This is the preferred method

export const {
  CHANNEL_CREATED,
  STORY_SPECIFIED,
  SET_STORIES,
  SET_CURRENT_STORY,
  CURRENT_STORY_WAS_SET,
  FORCE_RE_RENDER,
  STORY_CHANGED,
  STORY_UNCHANGED,
  STORY_RENDERED,
  STORY_MISSING,
  STORY_ERRORED,
  STORY_THREW_EXCEPTION,
  UPDATE_STORY_ARGS,
  STORY_ARGS_UPDATED,
  RESET_STORY_ARGS,
  UPDATE_GLOBALS,
  GLOBALS_UPDATED,
  REGISTER_SUBSCRIPTION,
  PREVIEW_KEYDOWN,
  SELECT_STORY,
  STORIES_COLLAPSE_ALL,
  STORIES_EXPAND_ALL,
  DOCS_RENDERED,
  SHARED_STATE_CHANGED,
  SHARED_STATE_SET,
  NAVIGATE_URL
} = events;