"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAVIGATE_URL = exports.SHARED_STATE_SET = exports.SHARED_STATE_CHANGED = exports.DOCS_RENDERED = exports.STORIES_EXPAND_ALL = exports.STORIES_COLLAPSE_ALL = exports.SELECT_STORY = exports.PREVIEW_KEYDOWN = exports.REGISTER_SUBSCRIPTION = exports.GLOBALS_UPDATED = exports.UPDATE_GLOBALS = exports.RESET_STORY_ARGS = exports.STORY_ARGS_UPDATED = exports.UPDATE_STORY_ARGS = exports.STORY_THREW_EXCEPTION = exports.STORY_ERRORED = exports.STORY_MISSING = exports.STORY_RENDERED = exports.STORY_UNCHANGED = exports.STORY_CHANGED = exports.FORCE_RE_RENDER = exports.CURRENT_STORY_WAS_SET = exports.SET_CURRENT_STORY = exports.SET_STORIES = exports.STORY_SPECIFIED = exports.CHANNEL_CREATED = exports.default = void 0;
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

var _default = events; // Enables: `import * as Events from ...` or `import { CHANNEL_CREATED } as Events from ...`
// This is the preferred method

exports.default = _default;
var CHANNEL_CREATED = events.CHANNEL_CREATED,
    STORY_SPECIFIED = events.STORY_SPECIFIED,
    SET_STORIES = events.SET_STORIES,
    SET_CURRENT_STORY = events.SET_CURRENT_STORY,
    CURRENT_STORY_WAS_SET = events.CURRENT_STORY_WAS_SET,
    FORCE_RE_RENDER = events.FORCE_RE_RENDER,
    STORY_CHANGED = events.STORY_CHANGED,
    STORY_UNCHANGED = events.STORY_UNCHANGED,
    STORY_RENDERED = events.STORY_RENDERED,
    STORY_MISSING = events.STORY_MISSING,
    STORY_ERRORED = events.STORY_ERRORED,
    STORY_THREW_EXCEPTION = events.STORY_THREW_EXCEPTION,
    UPDATE_STORY_ARGS = events.UPDATE_STORY_ARGS,
    STORY_ARGS_UPDATED = events.STORY_ARGS_UPDATED,
    RESET_STORY_ARGS = events.RESET_STORY_ARGS,
    UPDATE_GLOBALS = events.UPDATE_GLOBALS,
    GLOBALS_UPDATED = events.GLOBALS_UPDATED,
    REGISTER_SUBSCRIPTION = events.REGISTER_SUBSCRIPTION,
    PREVIEW_KEYDOWN = events.PREVIEW_KEYDOWN,
    SELECT_STORY = events.SELECT_STORY,
    STORIES_COLLAPSE_ALL = events.STORIES_COLLAPSE_ALL,
    STORIES_EXPAND_ALL = events.STORIES_EXPAND_ALL,
    DOCS_RENDERED = events.DOCS_RENDERED,
    SHARED_STATE_CHANGED = events.SHARED_STATE_CHANGED,
    SHARED_STATE_SET = events.SHARED_STATE_SET,
    NAVIGATE_URL = events.NAVIGATE_URL;
exports.NAVIGATE_URL = NAVIGATE_URL;
exports.SHARED_STATE_SET = SHARED_STATE_SET;
exports.SHARED_STATE_CHANGED = SHARED_STATE_CHANGED;
exports.DOCS_RENDERED = DOCS_RENDERED;
exports.STORIES_EXPAND_ALL = STORIES_EXPAND_ALL;
exports.STORIES_COLLAPSE_ALL = STORIES_COLLAPSE_ALL;
exports.SELECT_STORY = SELECT_STORY;
exports.PREVIEW_KEYDOWN = PREVIEW_KEYDOWN;
exports.REGISTER_SUBSCRIPTION = REGISTER_SUBSCRIPTION;
exports.GLOBALS_UPDATED = GLOBALS_UPDATED;
exports.UPDATE_GLOBALS = UPDATE_GLOBALS;
exports.RESET_STORY_ARGS = RESET_STORY_ARGS;
exports.STORY_ARGS_UPDATED = STORY_ARGS_UPDATED;
exports.UPDATE_STORY_ARGS = UPDATE_STORY_ARGS;
exports.STORY_THREW_EXCEPTION = STORY_THREW_EXCEPTION;
exports.STORY_ERRORED = STORY_ERRORED;
exports.STORY_MISSING = STORY_MISSING;
exports.STORY_RENDERED = STORY_RENDERED;
exports.STORY_UNCHANGED = STORY_UNCHANGED;
exports.STORY_CHANGED = STORY_CHANGED;
exports.FORCE_RE_RENDER = FORCE_RE_RENDER;
exports.CURRENT_STORY_WAS_SET = CURRENT_STORY_WAS_SET;
exports.SET_CURRENT_STORY = SET_CURRENT_STORY;
exports.SET_STORIES = SET_STORIES;
exports.STORY_SPECIFIED = STORY_SPECIFIED;
exports.CHANNEL_CREATED = CHANNEL_CREATED;