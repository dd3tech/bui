"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoryRenderer = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.object.keys.js");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _global = _interopRequireDefault(require("global"));

var _ansiToHtml = _interopRequireDefault(require("ansi-to-html"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _clientLogger = require("@storybook/client-logger");

var _NoDocs = require("./NoDocs");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var document = _global.default.document,
    _global$FEATURES = _global.default.FEATURES,
    FEATURES = _global$FEATURES === void 0 ? {} : _global$FEATURES; // We have "changed" story if this changes

var layoutClassMap = {
  centered: 'sb-main-centered',
  fullscreen: 'sb-main-fullscreen',
  padded: 'sb-main-padded'
};
var classes = {
  MAIN: 'sb-show-main',
  NOPREVIEW: 'sb-show-nopreview',
  ERROR: 'sb-show-errordisplay'
};
var ansiConverter = new _ansiToHtml.default({
  escapeXML: true
});
/**
 * StoryRenderer is responsible for rendering the correct story to the screen
 *
 * It is very much concerned with drawing to the screen and will do things like change classes
 * on the body etc.
 */

var StoryRenderer = /*#__PURE__*/function () {
  function StoryRenderer(_ref) {
    var render = _ref.render,
        channel = _ref.channel,
        storyStore = _ref.storyStore;

    _classCallCheck(this, StoryRenderer);

    this.render = void 0;
    this.channel = void 0;
    this.storyStore = void 0;
    this.previousMetadata = void 0;
    this.previousLayoutClass = void 0;
    this.render = render;
    this.channel = channel;
    this.storyStore = storyStore;
    this.setupListeners();
  }

  _createClass(StoryRenderer, [{
    key: "setupListeners",
    value: function setupListeners() {
      var _this = this;

      // Channel can be null in StoryShots
      if (this.channel) {
        this.channel.on(_coreEvents.default.CURRENT_STORY_WAS_SET, function () {
          return _this.renderCurrentStory(false);
        });
        this.channel.on(_coreEvents.default.STORY_ARGS_UPDATED, function () {
          return _this.forceReRender();
        });
        this.channel.on(_coreEvents.default.GLOBALS_UPDATED, function () {
          return _this.forceReRender();
        });
        this.channel.on(_coreEvents.default.FORCE_RE_RENDER, function () {
          return _this.forceReRender();
        });
      }
    }
  }, {
    key: "forceReRender",
    value: function forceReRender() {
      this.renderCurrentStory(true);
    }
  }, {
    key: "renderCurrentStory",
    value: function () {
      var _renderCurrentStory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(forceRender) {
        var _this2 = this;

        var storyStore, loadError, _ref2, storyId, urlViewMode, data, _ref3, kind, id, _ref3$parameters, parameters, getDecorated, docsOnly, layout, metadata, context;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                storyStore = this.storyStore;
                loadError = storyStore.getError();

                if (!loadError) {
                  _context.next = 5;
                  break;
                }

                this.showErrorDisplay(loadError);
                return _context.abrupt("return");

              case 5:
                _ref2 = storyStore.getSelection() || {}, storyId = _ref2.storyId, urlViewMode = _ref2.viewMode;
                data = storyStore.fromId(storyId);
                _ref3 = data || {}, kind = _ref3.kind, id = _ref3.id, _ref3$parameters = _ref3.parameters, parameters = _ref3$parameters === void 0 ? {} : _ref3$parameters, getDecorated = _ref3.getDecorated;
                docsOnly = parameters.docsOnly, layout = parameters.layout;
                metadata = {
                  id: id,
                  kind: kind,
                  viewMode: docsOnly ? 'docs' : urlViewMode,
                  getDecorated: getDecorated
                };
                this.applyLayout(metadata.viewMode === 'docs' ? 'fullscreen' : layout);
                context = Object.assign({
                  id: storyId
                }, data, {
                  forceRender: forceRender,
                  showMain: function showMain() {
                    return _this2.showMain();
                  },
                  showError: function showError(_ref4) {
                    var title = _ref4.title,
                        description = _ref4.description;
                    return _this2.renderError({
                      title: title,
                      description: description
                    });
                  },
                  showException: function showException(err) {
                    return _this2.renderException(err);
                  }
                });
                _context.next = 14;
                return this.renderStoryIfChanged({
                  metadata: metadata,
                  context: context
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function renderCurrentStory(_x) {
        return _renderCurrentStory.apply(this, arguments);
      }

      return renderCurrentStory;
    }()
  }, {
    key: "renderStoryIfChanged",
    value: function () {
      var _renderStoryIfChanged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref5) {
        var metadata, context, forceRender, name, previousMetadata, storyStore, storyChanged, implementationChanged, viewModeChanged, kindChanged;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                metadata = _ref5.metadata, context = _ref5.context;
                forceRender = context.forceRender, name = context.name;
                previousMetadata = this.previousMetadata, storyStore = this.storyStore;
                storyChanged = !previousMetadata || previousMetadata.id !== metadata.id; // getDecorated is a function that returns a decorated story function. It'll change whenever the story
                // is reloaded into the store, which means the module the story was defined in was HMR-ed.

                implementationChanged = !previousMetadata || previousMetadata.getDecorated !== metadata.getDecorated;
                viewModeChanged = !previousMetadata || previousMetadata.viewMode !== metadata.viewMode;
                kindChanged = !previousMetadata || previousMetadata.kind !== metadata.kind; // Don't re-render the story if nothing has changed to justify it

                if (!(!forceRender && !storyChanged && !implementationChanged && !viewModeChanged)) {
                  _context2.next = 10;
                  break;
                }

                this.channel.emit(_coreEvents.default.STORY_UNCHANGED, Object.assign({}, metadata, {
                  name: name
                }));
                return _context2.abrupt("return");

              case 10:
                // If we are rendering something new (as opposed to re-rendering the same or first story), emit
                if (previousMetadata && (storyChanged || kindChanged || viewModeChanged)) {
                  this.channel.emit(_coreEvents.default.STORY_CHANGED, metadata.id);
                }

                _context2.t0 = previousMetadata ? previousMetadata.viewMode : 'story';
                _context2.next = _context2.t0 === 'docs' ? 14 : _context2.t0 === 'story' ? 16 : 16;
                break;

              case 14:
                if (kindChanged || viewModeChanged) {
                  this.storyStore.cleanHooksForKind(previousMetadata.kind);

                  _reactDom.default.unmountComponentAtNode(document.getElementById('docs-root'));
                }

                return _context2.abrupt("break", 17);

              case 16:
                if (previousMetadata && (storyChanged || viewModeChanged)) {
                  this.storyStore.cleanHooks(previousMetadata.id);

                  _reactDom.default.unmountComponentAtNode(document.getElementById('root'));
                }

              case 17:
                if (!viewModeChanged) {
                  _context2.next = 25;
                  break;
                }

                _context2.t1 = metadata.viewMode;
                _context2.next = _context2.t1 === 'docs' ? 21 : _context2.t1 === 'story' ? 24 : 24;
                break;

              case 21:
                this.showMain();
                this.showDocs();
                return _context2.abrupt("break", 25);

              case 24:
                if (previousMetadata) {
                  this.showStory();
                }

              case 25:
                _context2.t2 = metadata.viewMode;
                _context2.next = _context2.t2 === 'docs' ? 28 : _context2.t2 === 'story' ? 30 : 30;
                break;

              case 28:
                this.renderDocs({
                  context: context,
                  storyStore: storyStore
                });
                return _context2.abrupt("break", 33);

              case 30:
                _context2.next = 32;
                return this.renderStory({
                  context: context
                });

              case 32:
                return _context2.abrupt("break", 33);

              case 33:
                this.previousMetadata = metadata;

                if (!forceRender && metadata.viewMode !== 'docs') {
                  document.documentElement.scrollTop = 0;
                  document.documentElement.scrollLeft = 0;
                }

              case 35:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function renderStoryIfChanged(_x2) {
        return _renderStoryIfChanged.apply(this, arguments);
      }

      return renderStoryIfChanged;
    }()
  }, {
    key: "applyLayout",
    value: function applyLayout() {
      var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'padded';

      if (layout === 'none') {
        document.body.classList.remove(this.previousLayoutClass);
        this.previousLayoutClass = null;
        return;
      }

      this.checkIfLayoutExists(layout);
      var layoutClass = layoutClassMap[layout];
      document.body.classList.remove(this.previousLayoutClass);
      document.body.classList.add(layoutClass);
      this.previousLayoutClass = layoutClass;
    }
  }, {
    key: "checkIfLayoutExists",
    value: function checkIfLayoutExists(layout) {
      if (!layoutClassMap[layout]) {
        _clientLogger.logger.warn((0, _tsDedent.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["The desired layout: ", " is not a valid option.\n         The possible options are: ", ", none."])), layout, Object.keys(layoutClassMap).join(', ')));
      }
    }
  }, {
    key: "showErrorDisplay",
    value: function showErrorDisplay(_ref6) {
      var _ref6$message = _ref6.message,
          message = _ref6$message === void 0 ? '' : _ref6$message,
          _ref6$stack = _ref6.stack,
          stack = _ref6$stack === void 0 ? '' : _ref6$stack;
      document.getElementById('error-message').innerHTML = ansiConverter.toHtml(message);
      document.getElementById('error-stack').innerHTML = ansiConverter.toHtml(stack);
      document.body.classList.remove(classes.MAIN);
      document.body.classList.remove(classes.NOPREVIEW);
      document.body.classList.add(classes.ERROR);
    }
  }, {
    key: "showNoPreview",
    value: function showNoPreview() {
      document.body.classList.remove(classes.MAIN);
      document.body.classList.remove(classes.ERROR);
      document.body.classList.add(classes.NOPREVIEW);
    }
  }, {
    key: "showMain",
    value: function showMain() {
      document.body.classList.remove(classes.NOPREVIEW);
      document.body.classList.remove(classes.ERROR);
      document.body.classList.add(classes.MAIN);
    }
  }, {
    key: "showDocs",
    value: function showDocs() {
      document.getElementById('root').setAttribute('hidden', 'true');
      document.getElementById('docs-root').removeAttribute('hidden');
    }
  }, {
    key: "showStory",
    value: function showStory() {
      document.getElementById('docs-root').setAttribute('hidden', 'true');
      document.getElementById('root').removeAttribute('hidden');
    }
  }, {
    key: "renderStory",
    value: function () {
      var _renderStory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
        var context, _ref7$context, id, getDecorated, applyLoaders, runPlayFunction, unboundStoryFn, forceRender, storyContext, storyFn;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                context = _ref7.context, _ref7$context = _ref7.context, id = _ref7$context.id, getDecorated = _ref7$context.getDecorated;

                if (!getDecorated) {
                  _context3.next = 21;
                  break;
                }

                _context3.prev = 2;
                applyLoaders = context.applyLoaders, runPlayFunction = context.runPlayFunction, unboundStoryFn = context.unboundStoryFn, forceRender = context.forceRender;
                _context3.next = 6;
                return applyLoaders();

              case 6:
                storyContext = _context3.sent;

                storyFn = function storyFn() {
                  return unboundStoryFn(storyContext);
                };

                _context3.next = 10;
                return this.render(Object.assign({}, context, {
                  storyContext: storyContext,
                  storyFn: storyFn
                }));

              case 10:
                if (!(FEATURES.previewCsfV3 && !forceRender)) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 13;
                return runPlayFunction();

              case 13:
                this.channel.emit(_coreEvents.default.STORY_RENDERED, id);
                _context3.next = 19;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](2);
                this.renderException(_context3.t0);

              case 19:
                _context3.next = 23;
                break;

              case 21:
                this.showNoPreview();
                this.channel.emit(_coreEvents.default.STORY_MISSING, id);

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 16]]);
      }));

      function renderStory(_x3) {
        return _renderStory.apply(this, arguments);
      }

      return renderStory;
    }()
  }, {
    key: "renderDocs",
    value: function renderDocs(_ref8) {
      var _this3 = this;

      var context = _ref8.context,
          storyStore = _ref8.storyStore;
      var kind = context.kind,
          parameters = context.parameters,
          id = context.id;

      if (id === '*' || !parameters) {
        return;
      }

      var docs = parameters.docs || {};

      if (docs.page && !docs.container) {
        throw new Error('No `docs.container` set, did you run `addon-docs/preset`?');
      }

      var DocsContainer = docs.container || function (_ref9) {
        var children = _ref9.children;
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
      };

      var Page = docs.page || _NoDocs.NoDocs; // Docs context includes the storyStore. Probably it would be better if it didn't but that can be fixed in a later refactor

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(DocsContainer, {
        context: Object.assign({
          storyStore: storyStore
        }, context)
      }, /*#__PURE__*/_react.default.createElement(Page, null)), document.getElementById('docs-root'), function () {
        return _this3.channel.emit(_coreEvents.default.DOCS_RENDERED, kind);
      });
    } // renderException is used if we fail to render the story and it is uncaught by the app layer

  }, {
    key: "renderException",
    value: function renderException(err) {
      this.channel.emit(_coreEvents.default.STORY_THREW_EXCEPTION, err);
      this.showErrorDisplay(err); // Log the stack to the console. So, user could check the source code.

      _clientLogger.logger.error(err);
    } // renderError is used by the various app layers to inform the user they have done something
    // wrong -- for instance returned the wrong thing from a story

  }, {
    key: "renderError",
    value: function renderError(_ref10) {
      var title = _ref10.title,
          description = _ref10.description;
      this.channel.emit(_coreEvents.default.STORY_ERRORED, {
        title: title,
        description: description
      });
      this.showErrorDisplay({
        message: title,
        stack: description
      });
    }
  }]);

  return StoryRenderer;
}();

exports.StoryRenderer = StoryRenderer;