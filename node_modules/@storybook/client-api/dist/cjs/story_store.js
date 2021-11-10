"use strict";

require("core-js/modules/es.object.freeze.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.set.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.from.js");

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _stable = _interopRequireDefault(require("stable"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _clientLogger = require("@storybook/client-logger");

var _csf = require("@storybook/csf");

var _args3 = require("./args");

var _hooks = require("./hooks");

var _storySort = require("./storySort");

var _parameters = require("./parameters");

var _ensureArgTypes = require("./ensureArgTypes");

var _inferArgTypes = require("./inferArgTypes");

var _inferControls = require("./inferControls");

var _templateObject, _templateObject2, _templateObject3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function extractSanitizedKindNameFromStorySpecifier(storySpecifier) {
  if (typeof storySpecifier === 'string') {
    return storySpecifier.split('--').shift();
  }

  return (0, _csf.sanitize)(storySpecifier.kind);
}

function extractIdFromStorySpecifier(storySpecifier) {
  if (typeof storySpecifier === 'string') {
    return storySpecifier;
  }

  return (0, _csf.toId)(storySpecifier.kind, storySpecifier.name);
}

var isStoryDocsOnly = function isStoryDocsOnly(parameters) {
  return parameters && parameters.docsOnly;
};

var includeStory = function includeStory(story) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    includeDocsOnly: false
  };

  if (options.includeDocsOnly) {
    return true;
  }

  return !isStoryDocsOnly(story.parameters);
};

var checkGlobals = function checkGlobals(parameters) {
  var globals = parameters.globals,
      globalTypes = parameters.globalTypes;

  if (globals || globalTypes) {
    _clientLogger.logger.error('Global args/argTypes can only be set globally', JSON.stringify({
      globals: globals,
      globalTypes: globalTypes
    }));
  }
};

var checkStorySort = function checkStorySort(parameters) {
  var options = parameters.options;
  if (options !== null && options !== void 0 && options.storySort) _clientLogger.logger.error('The storySort option parameter can only be set globally');
};

var storyFnWarning = (0, _utilDeprecate.default)(function () {}, (0, _tsDedent.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  `storyFn` is deprecated and will be removed in Storybook 7.0.\n\n  https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-storyfn"], ["\n  \\`storyFn\\` is deprecated and will be removed in Storybook 7.0.\n\n  https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-storyfn"]))));
var argTypeDefaultValueWarning = (0, _utilDeprecate.default)(function () {}, (0, _tsDedent.default)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  `argType.defaultValue` is deprecated and will be removed in Storybook 7.0.\n\n  https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-argtype-defaultValue"], ["\n  \\`argType.defaultValue\\` is deprecated and will be removed in Storybook 7.0.\n\n  https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-argtype-defaultValue"]))));

var toExtracted = function toExtracted(obj) {
  return Object.entries(obj).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (typeof value === 'function') {
      return acc;
    } // NOTE: We're serializing argTypes twice, at the top-level and also in parameters.
    // We currently rely on useParameters in the manager, so strip out the top-level argTypes
    // instead for performance.


    if (['hooks', 'argTypes'].includes(key)) {
      return acc;
    }

    if (Array.isArray(value)) {
      return Object.assign(acc, _defineProperty({}, key, value.slice().sort()));
    }

    return Object.assign(acc, _defineProperty({}, key, value));
  }, {});
};

var StoryStore = /*#__PURE__*/function () {
  // Keyed on kind name
  // Keyed on storyId
  function StoryStore(params) {
    var _this = this;

    _classCallCheck(this, StoryStore);

    this._error = void 0;
    this._channel = void 0;
    this._configuring = void 0;
    this._globals = void 0;
    this._initialGlobals = void 0;
    this._defaultGlobals = void 0;
    this._globalMetadata = void 0;
    this._kinds = void 0;
    this._stories = void 0;
    this._argsEnhancers = void 0;
    this._argTypesEnhancers = void 0;
    this._selectionSpecifier = void 0;
    this._selection = void 0;

    this.remove = function (id) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$allowUnsafe = _ref3.allowUnsafe,
          allowUnsafe = _ref3$allowUnsafe === void 0 ? false : _ref3$allowUnsafe;

      if (!_this._configuring && !allowUnsafe) throw new Error('Cannot remove a story when not configuring, see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#story-store-immutable-outside-of-configuration');
      var _stories = _this._stories;
      var story = _stories[id];
      delete _stories[id];
      if (story) story.hooks.clean();
    };

    this.fromId = function (id) {
      try {
        var data = _this._stories[id];

        if (!data || !data.getDecorated) {
          return null;
        }

        return _this.mergeAdditionalDataToStory(data);
      } catch (e) {
        _clientLogger.logger.warn('failed to get story:', _this._stories);

        _clientLogger.logger.error(e);

        return null;
      }
    };

    this.setError = function (err) {
      _this._error = err;
    };

    this.getError = function () {
      return _this._error;
    };

    this.getSelection = function () {
      return _this._selection;
    };

    this.getDataForManager = function () {
      return {
        v: 2,
        globalParameters: _this._globalMetadata.parameters,
        globals: _this._globals,
        error: _this.getError(),
        kindParameters: (0, _mapValues.default)(_this._kinds, function (metadata) {
          return metadata.parameters;
        }),
        stories: _this.extract({
          includeDocsOnly: true,
          normalizeParameters: true
        })
      };
    };

    this.getStoriesJsonData = function () {
      var value = _this.getDataForManager();

      var allowed = ['fileName', 'docsOnly', 'framework', '__id', '__isArgsStory'];
      return {
        v: 2,
        globalParameters: (0, _pick.default)(value.globalParameters, allowed),
        kindParameters: (0, _mapValues.default)(value.kindParameters, function (v) {
          return (0, _pick.default)(v, allowed);
        }),
        stories: (0, _mapValues.default)(value.stories, function (v) {
          return Object.assign({}, (0, _pick.default)(v, ['id', 'name', 'kind', 'story']), {
            parameters: (0, _pick.default)(v.parameters, allowed)
          });
        })
      };
    };

    this.pushToManager = function () {
      if (_this._channel) {
        // send to the parent frame.
        _this._channel.emit(_coreEvents.default.SET_STORIES, _this.getDataForManager());
      }
    };

    this.getStoriesForKind = function (kind) {
      return _this.raw().filter(function (story) {
        return story.kind === kind;
      });
    };

    // Assume we are configuring until we hear otherwise
    this._configuring = true;
    this._globals = {};
    this._defaultGlobals = {};
    this._initialGlobals = {};
    this._globalMetadata = {
      parameters: {},
      decorators: [],
      loaders: []
    };
    this._kinds = {};
    this._stories = {};
    this._argsEnhancers = [];
    this._argTypesEnhancers = [_ensureArgTypes.ensureArgTypes];
    this._error = undefined;
    this._channel = params.channel;
    this.setupListeners();
  }

  _createClass(StoryStore, [{
    key: "setupListeners",
    value: function setupListeners() {
      var _this2 = this;

      // Channel can be null in StoryShots
      if (!this._channel) return;

      this._channel.on(_coreEvents.default.SET_CURRENT_STORY, function (_ref4) {
        var storyId = _ref4.storyId,
            viewMode = _ref4.viewMode;
        return _this2.setSelection({
          storyId: storyId,
          viewMode: viewMode
        });
      });

      this._channel.on(_coreEvents.default.UPDATE_STORY_ARGS, function (_ref5) {
        var storyId = _ref5.storyId,
            updatedArgs = _ref5.updatedArgs;
        return _this2.updateStoryArgs(storyId, updatedArgs);
      });

      this._channel.on(_coreEvents.default.RESET_STORY_ARGS, function (_ref6) {
        var storyId = _ref6.storyId,
            argNames = _ref6.argNames;
        return _this2.resetStoryArgs(storyId, argNames);
      });

      this._channel.on(_coreEvents.default.UPDATE_GLOBALS, function (_ref7) {
        var globals = _ref7.globals;
        return _this2.updateGlobals(globals);
      });
    }
  }, {
    key: "startConfiguring",
    value: function startConfiguring() {
      this._configuring = true;

      var safePush = function safePush(enhancer, enhancers) {
        if (!enhancers.includes(enhancer)) enhancers.push(enhancer);
      }; // run these at the end


      safePush(_inferArgTypes.inferArgTypes, this._argTypesEnhancers);
      safePush(_inferControls.inferControls, this._argTypesEnhancers);
    }
  }, {
    key: "finishConfiguring",
    value: function finishConfiguring() {
      this._configuring = false;
      var _this$_globalMetadata = this._globalMetadata.parameters,
          _this$_globalMetadata2 = _this$_globalMetadata.globals,
          globals = _this$_globalMetadata2 === void 0 ? {} : _this$_globalMetadata2,
          _this$_globalMetadata3 = _this$_globalMetadata.globalTypes,
          globalTypes = _this$_globalMetadata3 === void 0 ? {} : _this$_globalMetadata3;
      var allowedGlobals = new Set([].concat(_toConsumableArray(Object.keys(globals)), _toConsumableArray(Object.keys(globalTypes))));
      var defaultGlobals = Object.entries(globalTypes).reduce(function (acc, _ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
            arg = _ref9[0],
            defaultValue = _ref9[1].defaultValue;

        if (defaultValue) acc[arg] = defaultValue;
        return acc;
      }, {});
      this._initialGlobals = Object.assign({}, defaultGlobals, globals); // To deal with HMR & persistence, we consider the previous value of global args, and:
      //   1. Remove any keys that are not in the new parameter
      //   2. Preference any keys that were already set
      //   3. Use any new keys from the new parameter

      this._globals = Object.entries(this._globals || {}).reduce(function (acc, _ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            key = _ref11[0],
            previousValue = _ref11[1];

        if (allowedGlobals.has(key)) acc[key] = previousValue;
        return acc;
      }, Object.assign({}, this._initialGlobals)); // Set the current selection based on the current selection specifier, if selection is not yet set

      var stories = this.sortedStories();
      var foundStory;

      if (this._selectionSpecifier && !this._selection) {
        var _this$_selectionSpeci = this._selectionSpecifier,
            storySpecifier = _this$_selectionSpeci.storySpecifier,
            viewMode = _this$_selectionSpeci.viewMode,
            urlArgs = _this$_selectionSpeci.args,
            urlGlobals = _this$_selectionSpeci.globals;

        if (urlGlobals) {
          var allowedUrlGlobals = Object.entries(urlGlobals).reduce(function (acc, _ref12) {
            var _ref13 = _slicedToArray(_ref12, 2),
                key = _ref13[0],
                value = _ref13[1];

            if (allowedGlobals.has(key)) acc[key] = value;
            return acc;
          }, {});
          this._globals = (0, _parameters.combineParameters)(this._globals, allowedUrlGlobals);
        }

        if (storySpecifier === '*') {
          // '*' means select the first story. If there is none, we have no selection.
          var _stories2 = _slicedToArray(stories, 1);

          foundStory = _stories2[0];
        } else if (typeof storySpecifier === 'string') {
          // Find the story with the exact id that matches the specifier (see #11571)
          foundStory = Object.values(stories).find(function (s) {
            return s.id === storySpecifier;
          });

          if (!foundStory) {
            // Fallback to the first story that starts with the specifier
            foundStory = Object.values(stories).find(function (s) {
              return s.id.startsWith(storySpecifier);
            });
          }
        } else {
          // Try and find a story matching the name/kind, setting no selection if they don't exist.
          var name = storySpecifier.name,
              kind = storySpecifier.kind;
          foundStory = this.getRawStory(kind, name);
        }

        if (foundStory) {
          if (urlArgs) {
            var mappedUrlArgs = (0, _args3.mapArgsToTypes)(urlArgs, foundStory.argTypes);
            foundStory.args = (0, _args3.combineArgs)(foundStory.args, mappedUrlArgs);
          }

          foundStory.args = (0, _args3.validateOptions)(foundStory.args, foundStory.argTypes);
          this.setSelection({
            storyId: foundStory.id,
            viewMode: viewMode
          });

          this._channel.emit(_coreEvents.default.STORY_SPECIFIED, {
            storyId: foundStory.id,
            viewMode: viewMode
          });
        }
      } // If we didn't find a story matching the specifier, we always want to emit CURRENT_STORY_WAS_SET anyway
      // in order to tell the StoryRenderer to render something (a "missing story" view)


      if (!foundStory && this._channel) {
        this._channel.emit(_coreEvents.default.CURRENT_STORY_WAS_SET, this._selection);
      }

      this.pushToManager();
    }
  }, {
    key: "addGlobalMetadata",
    value: function addGlobalMetadata(_ref14) {
      var _ref14$parameters = _ref14.parameters,
          parameters = _ref14$parameters === void 0 ? {} : _ref14$parameters,
          _ref14$decorators = _ref14.decorators,
          decorators = _ref14$decorators === void 0 ? [] : _ref14$decorators,
          _ref14$loaders = _ref14.loaders,
          loaders = _ref14$loaders === void 0 ? [] : _ref14$loaders;

      if (parameters) {
        var args = parameters.args,
            argTypes = parameters.argTypes;
        if (args || argTypes) _clientLogger.logger.warn('Found args/argTypes in global parameters.', JSON.stringify({
          args: args,
          argTypes: argTypes
        }));
      }

      var globalParameters = this._globalMetadata.parameters;
      this._globalMetadata.parameters = (0, _parameters.combineParameters)(globalParameters, parameters);

      function _safeAdd(items, collection, caption) {
        items.forEach(function (item) {
          if (collection.includes(item)) {
            _clientLogger.logger.warn("You tried to add a duplicate ".concat(caption, ", this is not expected"), item);
          } else {
            collection.push(item);
          }
        });
      }

      _safeAdd(decorators, this._globalMetadata.decorators, 'decorator');

      _safeAdd(loaders, this._globalMetadata.loaders, 'loader');
    }
  }, {
    key: "clearGlobalDecorators",
    value: function clearGlobalDecorators() {
      this._globalMetadata.decorators = [];
    }
  }, {
    key: "ensureKind",
    value: function ensureKind(kind) {
      if (!this._kinds[kind]) {
        this._kinds[kind] = {
          order: Object.keys(this._kinds).length,
          parameters: {},
          decorators: [],
          loaders: []
        };
      }
    }
  }, {
    key: "addKindMetadata",
    value: function addKindMetadata(kind, _ref15) {
      var _this$_kinds$kind$dec, _this$_kinds$kind$loa;

      var _ref15$parameters = _ref15.parameters,
          parameters = _ref15$parameters === void 0 ? {} : _ref15$parameters,
          _ref15$decorators = _ref15.decorators,
          decorators = _ref15$decorators === void 0 ? [] : _ref15$decorators,
          _ref15$loaders = _ref15.loaders,
          loaders = _ref15$loaders === void 0 ? [] : _ref15$loaders;

      if (this.shouldBlockAddingKindMetadata(kind)) {
        return;
      }

      this.ensureKind(kind);

      if (parameters) {
        checkGlobals(parameters);
        checkStorySort(parameters);
      }

      this._kinds[kind].parameters = (0, _parameters.combineParameters)(this._kinds[kind].parameters, parameters);

      (_this$_kinds$kind$dec = this._kinds[kind].decorators).push.apply(_this$_kinds$kind$dec, _toConsumableArray(decorators));

      (_this$_kinds$kind$loa = this._kinds[kind].loaders).push.apply(_this$_kinds$kind$loa, _toConsumableArray(loaders));
    }
  }, {
    key: "addArgsEnhancer",
    value: function addArgsEnhancer(argsEnhancer) {
      if (Object.keys(this._stories).length > 0) throw new Error('Cannot add an args enhancer to the store after a story has been added.');

      this._argsEnhancers.push(argsEnhancer);
    }
  }, {
    key: "addArgTypesEnhancer",
    value: function addArgTypesEnhancer(argTypesEnhancer) {
      if (Object.keys(this._stories).length > 0) throw new Error('Cannot add an argTypes enhancer to the store after a story has been added.');

      this._argTypesEnhancers.push(argTypesEnhancer);
    } // Combine the global, kind & story parameters of a story

  }, {
    key: "combineStoryParameters",
    value: function combineStoryParameters(parameters, kind) {
      return (0, _parameters.combineParameters)(this._globalMetadata.parameters, this._kinds[kind].parameters, parameters);
    }
  }, {
    key: "shouldBlockAddingStory",
    value: function shouldBlockAddingStory(id) {
      return this.isSingleStoryMode() && id !== extractIdFromStorySpecifier(this._selectionSpecifier.storySpecifier);
    }
  }, {
    key: "shouldBlockAddingKindMetadata",
    value: function shouldBlockAddingKindMetadata(kind) {
      return this.isSingleStoryMode() && (0, _csf.sanitize)(kind) !== extractSanitizedKindNameFromStorySpecifier(this._selectionSpecifier.storySpecifier);
    }
  }, {
    key: "addStory",
    value: function addStory(_ref16, _ref17) {
      var _this3 = this;

      var id = _ref16.id,
          kind = _ref16.kind,
          name = _ref16.name,
          original = _ref16.storyFn,
          _ref16$parameters = _ref16.parameters,
          storyParameters = _ref16$parameters === void 0 ? {} : _ref16$parameters,
          _ref16$decorators = _ref16.decorators,
          storyDecorators = _ref16$decorators === void 0 ? [] : _ref16$decorators,
          _ref16$loaders = _ref16.loaders,
          storyLoaders = _ref16$loaders === void 0 ? [] : _ref16$loaders;
      var applyDecorators = _ref17.applyDecorators,
          _ref17$allowUnsafe = _ref17.allowUnsafe,
          allowUnsafe = _ref17$allowUnsafe === void 0 ? false : _ref17$allowUnsafe;
      if (!this._configuring && !allowUnsafe) throw new Error('Cannot add a story when not configuring, see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#story-store-immutable-outside-of-configuration');

      if (this.shouldBlockAddingStory(id)) {
        return;
      }

      checkGlobals(storyParameters);
      checkStorySort(storyParameters);
      var _stories = this._stories;

      if (_stories[id]) {
        _clientLogger.logger.warn((0, _tsDedent.default)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        Story with id ", " already exists in the store!\n\n        Perhaps you added the same story twice, or you have a name collision?\n        Story ids need to be unique -- ensure you aren't using the same names modulo url-sanitization.\n      "])), id));
      }

      var identification = {
        id: id,
        kind: kind,
        name: name,
        story: name // legacy

      }; // immutable original storyFn

      var getOriginal = function getOriginal() {
        return original;
      };

      this.ensureKind(kind);
      var kindMetadata = this._kinds[kind];
      var decorators = [].concat(_toConsumableArray(storyDecorators), _toConsumableArray(kindMetadata.decorators), _toConsumableArray(this._globalMetadata.decorators));
      var loaders = [].concat(_toConsumableArray(this._globalMetadata.loaders), _toConsumableArray(kindMetadata.loaders), _toConsumableArray(storyLoaders));

      var finalStoryFn = function finalStoryFn(context) {
        var _context$args = context.args,
            args = _context$args === void 0 ? {} : _context$args,
            _context$argTypes = context.argTypes,
            argTypes = _context$argTypes === void 0 ? {} : _context$argTypes,
            parameters = context.parameters;
        var _parameters$passArgsF = parameters.passArgsFirst,
            passArgsFirst = _parameters$passArgsF === void 0 ? true : _parameters$passArgsF;
        var mapped = Object.assign({}, context, {
          args: Object.entries(args).reduce(function (acc, _ref18) {
            var _ref19 = _slicedToArray(_ref18, 2),
                key = _ref19[0],
                val = _ref19[1];

            var _ref20 = argTypes[key] || {},
                mapping = _ref20.mapping;

            acc[key] = mapping && val in mapping ? mapping[val] : val;
            return acc;
          }, {})
        });
        return passArgsFirst ? original(mapped.args, mapped) : original(mapped);
      }; // lazily decorate the story when it's loaded


      var getDecorated = (0, _memoizerific.default)(1)(function () {
        return applyDecorators(finalStoryFn, decorators);
      });
      var hooks = new _hooks.HooksContext(); // We need the combined parameters now in order to calculate argTypes, but we won't keep them

      var combinedParameters = this.combineStoryParameters(storyParameters, kind); // We are going to make various UI changes in both the manager and the preview
      // based on whether it's an "args story", i.e. whether the story accepts a first
      // argument which is an `Args` object. Here we store it as a parameter on every story
      // for convenience, but we preface it with `__` to denote that it's an internal API
      // and that users probably shouldn't look at it.

      var _combinedParameters$p = combinedParameters.passArgsFirst,
          passArgsFirst = _combinedParameters$p === void 0 ? true : _combinedParameters$p;

      var __isArgsStory = passArgsFirst && original.length > 0;

      var _this$_argTypesEnhanc = this._argTypesEnhancers.reduce(function (accumulatedParameters, enhancer) {
        return Object.assign({}, accumulatedParameters, {
          argTypes: enhancer(Object.assign({}, identification, {
            storyFn: original,
            parameters: accumulatedParameters,
            args: {},
            argTypes: {},
            globals: {},
            originalStoryFn: getOriginal()
          }))
        });
      }, Object.assign({
        __isArgsStory: __isArgsStory
      }, combinedParameters)),
          _this$_argTypesEnhanc2 = _this$_argTypesEnhanc.argTypes,
          argTypes = _this$_argTypesEnhanc2 === void 0 ? {} : _this$_argTypesEnhanc2;

      var storyParametersWithArgTypes = Object.assign({}, storyParameters, {
        argTypes: argTypes,
        __isArgsStory: __isArgsStory
      });

      var storyFn = function storyFn(runtimeContext) {
        var _this3$_selection;

        storyFnWarning();
        return getDecorated()(Object.assign({}, identification, runtimeContext, {
          // Calculate "combined" parameters at render time (NOTE: for perf we could just use combinedParameters from above?)
          parameters: _this3.combineStoryParameters(storyParametersWithArgTypes, kind),
          hooks: hooks,
          args: _stories[id].args,
          argTypes: argTypes,
          globals: _this3._globals,
          viewMode: (_this3$_selection = _this3._selection) === null || _this3$_selection === void 0 ? void 0 : _this3$_selection.viewMode,
          originalStoryFn: getOriginal()
        }));
      };

      var unboundStoryFn = function unboundStoryFn(context) {
        return getDecorated()(context);
      };

      var applyLoaders = /*#__PURE__*/function () {
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _this3$_selection2;

          var context, loadResults, loaded;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  context = Object.assign({}, identification, {
                    // Calculate "combined" parameters at render time (NOTE: for perf we could just use combinedParameters from above?)
                    parameters: _this3.combineStoryParameters(storyParametersWithArgTypes, kind),
                    hooks: hooks,
                    args: _stories[id].args,
                    argTypes: argTypes,
                    globals: _this3._globals,
                    viewMode: (_this3$_selection2 = _this3._selection) === null || _this3$_selection2 === void 0 ? void 0 : _this3$_selection2.viewMode,
                    originalStoryFn: getOriginal()
                  });
                  _context.next = 3;
                  return Promise.all(loaders.map(function (loader) {
                    return loader(context);
                  }));

                case 3:
                  loadResults = _context.sent;
                  loaded = Object.assign.apply(Object, [{}].concat(_toConsumableArray(loadResults)));
                  return _context.abrupt("return", Object.assign({}, context, {
                    loaded: loaded
                  }));

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function applyLoaders() {
          return _ref21.apply(this, arguments);
        };
      }(); // Pull out parameters.args.$ || .argTypes.$.defaultValue into initialArgs


      var passedArgs = Object.assign({}, this._kinds[kind].parameters.args, storyParameters.args);
      var defaultArgs = Object.entries(argTypes).reduce(function (acc, _ref22) {
        var _ref23 = _slicedToArray(_ref22, 2),
            arg = _ref23[0],
            defaultValue = _ref23[1].defaultValue;

        if (typeof defaultValue !== 'undefined') {
          acc[arg] = defaultValue;
        }

        return acc;
      }, {});

      if (Object.keys(defaultArgs).length > 0) {
        argTypeDefaultValueWarning();
      }

      var initialArgsBeforeEnhancers = Object.assign({}, defaultArgs, passedArgs);

      var initialArgs = this._argsEnhancers.reduce(function (accumulatedArgs, enhancer) {
        return Object.assign({}, accumulatedArgs, enhancer(Object.assign({}, identification, {
          parameters: combinedParameters,
          args: initialArgsBeforeEnhancers,
          argTypes: argTypes,
          globals: {},
          originalStoryFn: getOriginal()
        })));
      }, initialArgsBeforeEnhancers);

      var runPlayFunction = /*#__PURE__*/function () {
        var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _ref25, play;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _ref25 = combinedParameters, play = _ref25.play;
                  return _context2.abrupt("return", play ? play() : undefined);

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function runPlayFunction() {
          return _ref24.apply(this, arguments);
        };
      }();

      _stories[id] = Object.assign({}, identification, {
        hooks: hooks,
        getDecorated: getDecorated,
        getOriginal: getOriginal,
        applyLoaders: applyLoaders,
        runPlayFunction: runPlayFunction,
        storyFn: storyFn,
        unboundStoryFn: unboundStoryFn,
        parameters: storyParametersWithArgTypes,
        args: initialArgs,
        argTypes: argTypes,
        initialArgs: initialArgs
      });
    }
  }, {
    key: "removeStoryKind",
    value: function removeStoryKind(kind) {
      var _ref26 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref26$allowUnsafe = _ref26.allowUnsafe,
          allowUnsafe = _ref26$allowUnsafe === void 0 ? false : _ref26$allowUnsafe;

      if (!this._configuring && !allowUnsafe) throw new Error('Cannot remove a kind when not configuring, see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#story-store-immutable-outside-of-configuration');
      if (!this._kinds[kind]) return;
      this._kinds[kind].parameters = {};
      this._kinds[kind].decorators = [];
      this.cleanHooksForKind(kind);
      this._stories = Object.entries(this._stories).reduce(function (acc, _ref27) {
        var _ref28 = _slicedToArray(_ref27, 2),
            id = _ref28[0],
            story = _ref28[1];

        if (story.kind !== kind) acc[id] = story;
        return acc;
      }, {});
    }
  }, {
    key: "updateGlobals",
    value: function updateGlobals(newGlobals) {
      this._globals = Object.assign({}, this._globals, newGlobals);

      this._channel.emit(_coreEvents.default.GLOBALS_UPDATED, {
        globals: this._globals,
        initialGlobals: this._initialGlobals
      });
    }
  }, {
    key: "updateStoryArgs",
    value: function updateStoryArgs(id, newArgs) {
      if (!this._stories[id]) throw new Error("No story for id ".concat(id));
      var args = this._stories[id].args;
      this._stories[id].args = Object.assign({}, args, newArgs);

      this._channel.emit(_coreEvents.default.STORY_ARGS_UPDATED, {
        storyId: id,
        args: this._stories[id].args
      });
    }
  }, {
    key: "resetStoryArgs",
    value: function resetStoryArgs(id, argNames) {
      var _this4 = this;

      if (!this._stories[id]) throw new Error("No story for id ".concat(id));
      var _this$_stories$id = this._stories[id],
          args = _this$_stories$id.args,
          initialArgs = _this$_stories$id.initialArgs;
      this._stories[id].args = Object.assign({}, args); // Make a copy to avoid problems

      (argNames || Object.keys(args)).forEach(function (name) {
        // We overwrite like this to ensure we can reset to falsey values
        _this4._stories[id].args[name] = initialArgs[name];
      });

      this._channel.emit(_coreEvents.default.STORY_ARGS_UPDATED, {
        storyId: id,
        args: this._stories[id].args
      });
    }
  }, {
    key: "raw",
    value: function raw(options) {
      var _this5 = this;

      return Object.values(this._stories).filter(function (i) {
        return !!i.getDecorated;
      }).filter(function (i) {
        return includeStory(i, options);
      }).map(function (i) {
        return _this5.mergeAdditionalDataToStory(i);
      });
    }
  }, {
    key: "sortedStories",
    value: function sortedStories() {
      var _this$_globalMetadata4,
          _this$_globalMetadata5,
          _this6 = this;

      // NOTE: when kinds are HMR'ed they get temporarily removed from the `_stories` array
      // and thus lose order. However `_kinds[x].order` preservers the original load order
      var kindOrder = (0, _mapValues.default)(this._kinds, function (_ref29) {
        var order = _ref29.order;
        return order;
      });
      var storySortParameter = (_this$_globalMetadata4 = this._globalMetadata.parameters) === null || _this$_globalMetadata4 === void 0 ? void 0 : (_this$_globalMetadata5 = _this$_globalMetadata4.options) === null || _this$_globalMetadata5 === void 0 ? void 0 : _this$_globalMetadata5.storySort;
      var storyEntries = Object.entries(this._stories); // Add the kind parameters and global parameters to each entry

      var stories = storyEntries.map(function (_ref30) {
        var _ref31 = _slicedToArray(_ref30, 2),
            id = _ref31[0],
            story = _ref31[1];

        return [id, story, _this6._kinds[story.kind].parameters, _this6._globalMetadata.parameters];
      });

      if (storySortParameter) {
        var sortFn;

        if (typeof storySortParameter === 'function') {
          sortFn = storySortParameter;
        } else {
          sortFn = (0, _storySort.storySort)(storySortParameter);
        }

        _stable.default.inplace(stories, sortFn);
      } else {
        _stable.default.inplace(stories, function (s1, s2) {
          return kindOrder[s1[1].kind] - kindOrder[s2[1].kind];
        });
      }

      return stories.map(function (_ref32) {
        var _ref33 = _slicedToArray(_ref32, 2),
            id = _ref33[0],
            s = _ref33[1];

        return s;
      });
    }
  }, {
    key: "extract",
    value: function extract() {
      var _this7 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var stories = this.sortedStories(); // removes function values from all stories so they are safe to transport over the channel

      return stories.reduce(function (acc, story) {
        if (!includeStory(story, options)) return acc;
        var extracted = toExtracted(story);
        if (options.normalizeParameters) return Object.assign(acc, _defineProperty({}, story.id, extracted));
        var _ref34 = extracted,
            parameters = _ref34.parameters,
            kind = _ref34.kind;
        return Object.assign(acc, _defineProperty({}, story.id, Object.assign(extracted, {
          parameters: _this7.combineStoryParameters(parameters, kind)
        })));
      }, {});
    }
  }, {
    key: "clearError",
    value: function clearError() {
      this._error = null;
    }
  }, {
    key: "setSelectionSpecifier",
    value: function setSelectionSpecifier(selectionSpecifier) {
      this._selectionSpecifier = selectionSpecifier;
    }
  }, {
    key: "setSelection",
    value: function setSelection(selection) {
      this._selection = selection;

      if (this._channel) {
        this._channel.emit(_coreEvents.default.CURRENT_STORY_WAS_SET, this._selection);
      }
    }
  }, {
    key: "isSingleStoryMode",
    value: function isSingleStoryMode() {
      if (!this._selectionSpecifier) {
        return false;
      }

      var _this$_selectionSpeci2 = this._selectionSpecifier,
          singleStory = _this$_selectionSpeci2.singleStory,
          storySpecifier = _this$_selectionSpeci2.storySpecifier;
      return storySpecifier && storySpecifier !== '*' && singleStory;
    }
  }, {
    key: "getStoryKinds",
    value: function getStoryKinds() {
      return Array.from(new Set(this.raw().map(function (s) {
        return s.kind;
      })));
    }
  }, {
    key: "getRawStory",
    value: function getRawStory(kind, name) {
      return this.getStoriesForKind(kind).find(function (s) {
        return s.name === name;
      });
    }
  }, {
    key: "cleanHooks",
    value: function cleanHooks(id) {
      if (this._stories[id]) {
        this._stories[id].hooks.clean();
      }
    }
  }, {
    key: "cleanHooksForKind",
    value: function cleanHooksForKind(kind) {
      var _this8 = this;

      this.getStoriesForKind(kind).map(function (story) {
        return _this8.cleanHooks(story.id);
      });
    } // This API is a re-implementation of Storybook's original getStorybook() API.
    // As such it may not behave *exactly* the same, but aims to. Some notes:
    //  - It is *NOT* sorted by the user's sort function, but remains sorted in "insertion order"
    //  - It does not include docs-only stories

  }, {
    key: "getStorybook",
    value: function getStorybook() {
      var _this9 = this;

      return Object.values(this.raw().reduce(function (kinds, story) {
        if (!includeStory(story)) return kinds;
        var kind = story.kind,
            name = story.name,
            storyFn = story.storyFn,
            fileName = story.parameters.fileName; // eslint-disable-next-line no-param-reassign

        if (!kinds[kind]) kinds[kind] = {
          kind: kind,
          fileName: fileName,
          stories: []
        };
        kinds[kind].stories.push({
          name: name,
          render: storyFn
        });
        return kinds;
      }, {})).sort(function (s1, s2) {
        return _this9._kinds[s1.kind].order - _this9._kinds[s2.kind].order;
      });
    }
  }, {
    key: "mergeAdditionalDataToStory",
    value: function mergeAdditionalDataToStory(story) {
      return Object.assign({}, story, {
        parameters: this.combineStoryParameters(story.parameters, story.kind),
        globals: this._globals
      });
    }
  }]);

  return StoryStore;
}();

exports.default = StoryStore;