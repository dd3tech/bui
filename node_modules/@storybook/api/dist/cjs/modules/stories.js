"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.assign.js");

var _global = _interopRequireDefault(require("global"));

var _csf = require("@storybook/csf");

var _coreEvents = require("@storybook/core-events");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _events = require("../lib/events");

var _stories2 = require("../lib/stories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var DOCS_MODE = _global.default.DOCS_MODE;
var deprecatedOptionsParameterWarnings = ['enableShortcuts', 'theme', 'showRoots'].reduce(function (acc, option) {
  acc[option] = (0, _utilDeprecate.default)(function () {}, "parameters.options.".concat(option, " is deprecated and will be removed in Storybook 7.0.\nTo change this setting, use `addons.setConfig`. See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-immutable-options-parameters\n  "));
  return acc;
}, {});

function checkDeprecatedOptionParameters(options) {
  if (!options) {
    return;
  }

  Object.keys(options).forEach(function (option) {
    if (deprecatedOptionsParameterWarnings[option]) {
      deprecatedOptionsParameterWarnings[option]();
    }
  });
}

var init = function init(_ref) {
  var fullAPI = _ref.fullAPI,
      store = _ref.store,
      navigate = _ref.navigate,
      provider = _ref.provider,
      initialStoryId = _ref.storyId,
      initialViewMode = _ref.viewMode;
  var api = {
    storyId: _csf.toId,
    getData: function getData(storyId, refId) {
      var result = api.resolveStory(storyId, refId);
      return (0, _stories2.isRoot)(result) ? undefined : result;
    },
    resolveStory: function resolveStory(storyId, refId) {
      var _store$getState = store.getState(),
          refs = _store$getState.refs,
          storiesHash = _store$getState.storiesHash;

      if (refId) {
        return refs[refId].stories ? refs[refId].stories[storyId] : undefined;
      }

      return storiesHash ? storiesHash[storyId] : undefined;
    },
    getCurrentStoryData: function getCurrentStoryData() {
      var _store$getState2 = store.getState(),
          storyId = _store$getState2.storyId,
          refId = _store$getState2.refId;

      return api.getData(storyId, refId);
    },
    getParameters: function getParameters(storyIdOrCombo, parameterName) {
      var _ref2 = typeof storyIdOrCombo === 'string' ? {
        storyId: storyIdOrCombo,
        refId: undefined
      } : storyIdOrCombo,
          storyId = _ref2.storyId,
          refId = _ref2.refId;

      var data = api.getData(storyId, refId);

      if ((0, _stories2.isStory)(data)) {
        var parameters = data.parameters;
        return parameterName ? parameters[parameterName] : parameters;
      }

      return null;
    },
    getCurrentParameter: function getCurrentParameter(parameterName) {
      var _store$getState3 = store.getState(),
          storyId = _store$getState3.storyId,
          refId = _store$getState3.refId;

      var parameters = api.getParameters({
        storyId: storyId,
        refId: refId
      }, parameterName); // FIXME Returning falsey parameters breaks a bunch of toolbars code,
      // so this strange logic needs to be here until various client code is updated.

      return parameters || undefined;
    },
    jumpToComponent: function jumpToComponent(direction) {
      var _store$getState4 = store.getState(),
          storiesHash = _store$getState4.storiesHash,
          storyId = _store$getState4.storyId,
          refs = _store$getState4.refs,
          refId = _store$getState4.refId;

      var story = api.getData(storyId, refId); // cannot navigate when there's no current selection

      if (!story) {
        return;
      }

      var hash = refId ? refs[refId].stories || {} : storiesHash;
      var lookupList = Object.entries(hash).reduce(function (acc, i) {
        var value = i[1];

        if (value.isComponent) {
          acc.push(_toConsumableArray(i[1].children));
        }

        return acc;
      }, []);
      var index = lookupList.findIndex(function (i) {
        return i.includes(storyId);
      }); // cannot navigate beyond fist or last

      if (index === lookupList.length - 1 && direction > 0) {
        return;
      }

      if (index === 0 && direction < 0) {
        return;
      }

      var result = lookupList[index + direction][0];

      if (result) {
        api.selectStory(result, undefined, {
          ref: refId
        });
      }
    },
    jumpToStory: function jumpToStory(direction) {
      var _store$getState5 = store.getState(),
          storiesHash = _store$getState5.storiesHash,
          storyId = _store$getState5.storyId,
          refs = _store$getState5.refs,
          refId = _store$getState5.refId;

      var story = api.getData(storyId, refId);

      if (DOCS_MODE) {
        api.jumpToComponent(direction);
        return;
      } // cannot navigate when there's no current selection


      if (!story) {
        return;
      }

      var hash = story.refId ? refs[story.refId].stories : storiesHash;
      var lookupList = Object.keys(hash).filter(function (k) {
        return !(hash[k].children || Array.isArray(hash[k]));
      });
      var index = lookupList.indexOf(storyId); // cannot navigate beyond fist or last

      if (index === lookupList.length - 1 && direction > 0) {
        return;
      }

      if (index === 0 && direction < 0) {
        return;
      }

      var result = lookupList[index + direction];

      if (result) {
        api.selectStory(result, undefined, {
          ref: refId
        });
      }
    },
    setStories: function () {
      var _setStories = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input, error) {
        var hash;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Now create storiesHash by reordering the above by group
                hash = (0, _stories2.transformStoriesRawToStoriesHash)(input, {
                  provider: provider
                });
                _context.next = 3;
                return store.setState({
                  storiesHash: hash,
                  storiesConfigured: true,
                  storiesFailed: error
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setStories(_x, _x2) {
        return _setStories.apply(this, arguments);
      }

      return setStories;
    }(),
    selectFirstStory: function selectFirstStory() {
      var _store$getState6 = store.getState(),
          storiesHash = _store$getState6.storiesHash;

      var firstStory = Object.keys(storiesHash).find(function (k) {
        return !(storiesHash[k].children || Array.isArray(storiesHash[k]));
      });

      if (firstStory) {
        api.selectStory(firstStory);
        return;
      }

      navigate('/');
    },
    selectStory: function selectStory(kindOrId) {
      var story = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var ref = options.ref,
          viewModeFromArgs = options.viewMode;

      var _store$getState7 = store.getState(),
          _store$getState7$view = _store$getState7.viewMode,
          viewModeFromState = _store$getState7$view === void 0 ? 'story' : _store$getState7$view,
          storyId = _store$getState7.storyId,
          storiesHash = _store$getState7.storiesHash,
          refs = _store$getState7.refs;

      var hash = ref ? refs[ref].stories : storiesHash;

      if (!story) {
        var s = hash[kindOrId] || hash[(0, _csf.sanitize)(kindOrId)]; // eslint-disable-next-line no-nested-ternary

        var id = s ? s.children ? s.children[0] : s.id : kindOrId;
        var viewMode = s && !(0, _stories2.isRoot)(s) && (viewModeFromArgs || s.parameters.viewMode) ? s.parameters.viewMode : viewModeFromState; // In some cases, the viewMode could be something other than docs/story
        // ('settings', for example) and therefore we should make sure we go back
        // to the 'story' viewMode when navigating away from those pages.

        if (!viewMode.match(/docs|story/)) {
          viewMode = 'story';
        }

        var p = s && s.refId ? "/".concat(viewMode, "/").concat(s.refId, "_").concat(id) : "/".concat(viewMode, "/").concat(id);
        navigate(p);
      } else if (!kindOrId) {
        // This is a slugified version of the kind, but that's OK, our toId function is idempotent
        var kind = storyId.split('--', 2)[0];

        var _id = (0, _csf.toId)(kind, story);

        api.selectStory(_id, undefined, options);
      } else {
        var _id2 = ref ? "".concat(ref, "_").concat((0, _csf.toId)(kindOrId, story)) : (0, _csf.toId)(kindOrId, story);

        if (hash[_id2]) {
          api.selectStory(_id2, undefined, options);
        } else {
          // Support legacy API with component permalinks, where kind is `x/y` but permalink is 'z'
          var _k = hash[(0, _csf.sanitize)(kindOrId)];

          if (_k && _k.children) {
            var foundId = _k.children.find(function (childId) {
              return hash[childId].name === story;
            });

            if (foundId) {
              api.selectStory(foundId, undefined, options);
            }
          }
        }
      }
    },
    findLeafStoryId: function findLeafStoryId(storiesHash, storyId) {
      if (storiesHash[storyId].isLeaf) {
        return storyId;
      }

      var childStoryId = storiesHash[storyId].children[0];
      return api.findLeafStoryId(storiesHash, childStoryId);
    },
    updateStoryArgs: function updateStoryArgs(story, updatedArgs) {
      var storyId = story.id,
          refId = story.refId;
      fullAPI.emit(_coreEvents.UPDATE_STORY_ARGS, {
        storyId: storyId,
        updatedArgs: updatedArgs,
        options: {
          target: refId ? "storybook-ref-".concat(refId) : 'storybook-preview-iframe'
        }
      });
    },
    resetStoryArgs: function resetStoryArgs(story, argNames) {
      var storyId = story.id,
          refId = story.refId;
      fullAPI.emit(_coreEvents.RESET_STORY_ARGS, {
        storyId: storyId,
        argNames: argNames,
        options: {
          target: refId ? "storybook-ref-".concat(refId) : 'storybook-preview-iframe'
        }
      });
    }
  };

  var initModule = function initModule() {
    // On initial load, the local iframe will select the first story (or other "selection specifier")
    // and emit STORY_SPECIFIED with the id. We need to ensure we respond to this change.
    fullAPI.on(_coreEvents.STORY_SPECIFIED, function handler(_ref3) {
      var storyId = _ref3.storyId,
          viewMode = _ref3.viewMode;

      var _getEventMetadata = (0, _events.getEventMetadata)(this, fullAPI),
          sourceType = _getEventMetadata.sourceType;

      if (fullAPI.isSettingsScreenActive()) return;

      if (sourceType === 'local') {
        // Special case -- if we are already at the story being specified (i.e. the user started at a given story),
        // we don't need to change URL. See https://github.com/storybookjs/storybook/issues/11677
        var state = store.getState();

        if (state.storyId !== storyId || state.viewMode !== viewMode) {
          navigate("/".concat(viewMode, "/").concat(storyId));
        }
      }
    });
    fullAPI.on(_coreEvents.STORY_CHANGED, function handler() {
      var _getEventMetadata2 = (0, _events.getEventMetadata)(this, fullAPI),
          sourceType = _getEventMetadata2.sourceType;

      if (sourceType === 'local') {
        var options = fullAPI.getCurrentParameter('options');

        if (options) {
          checkDeprecatedOptionParameters(options);
          fullAPI.setOptions(options);
        }
      }
    });
    fullAPI.on(_coreEvents.SET_STORIES, function handler(data) {
      var _getEventMetadata3 = (0, _events.getEventMetadata)(this, fullAPI),
          ref = _getEventMetadata3.ref;

      var error = data.error || undefined;
      var stories = data.v ? (0, _stories2.denormalizeStoryParameters)(data) : data.stories;

      if (!ref) {
        if (!data.v) {
          throw new Error('Unexpected legacy SET_STORIES event from local source');
        }

        fullAPI.setStories(stories, error);
        var options = fullAPI.getCurrentParameter('options');
        checkDeprecatedOptionParameters(options);
        fullAPI.setOptions(options);
      } else {
        fullAPI.setRef(ref.id, Object.assign({}, ref, data, {
          stories: stories
        }), true);
      }
    });
    fullAPI.on(_coreEvents.SELECT_STORY, function handler(_ref4) {
      var kind = _ref4.kind,
          story = _ref4.story,
          rest = _objectWithoutProperties(_ref4, ["kind", "story"]);

      var _getEventMetadata4 = (0, _events.getEventMetadata)(this, fullAPI),
          ref = _getEventMetadata4.ref;

      if (!ref) {
        fullAPI.selectStory(kind, story, rest);
      } else {
        fullAPI.selectStory(kind, story, Object.assign({}, rest, {
          ref: ref.id
        }));
      }
    });
    fullAPI.on(_coreEvents.STORY_ARGS_UPDATED, function handleStoryArgsUpdated(_ref5) {
      var storyId = _ref5.storyId,
          args = _ref5.args;

      var _getEventMetadata5 = (0, _events.getEventMetadata)(this, fullAPI),
          ref = _getEventMetadata5.ref;

      if (!ref) {
        var _store$getState8 = store.getState(),
            storiesHash = _store$getState8.storiesHash;

        storiesHash[storyId].args = args;
        store.setState({
          storiesHash: storiesHash
        });
      } else {
        var _refId = ref.id,
            _stories = ref.stories;
        _stories[storyId].args = args;
        fullAPI.updateRef(_refId, {
          stories: _stories
        });
      }
    });
  };

  return {
    api: api,
    state: {
      storiesHash: {},
      storyId: initialStoryId,
      viewMode: initialViewMode,
      storiesConfigured: false
    },
    init: initModule
  };
};

exports.init = init;