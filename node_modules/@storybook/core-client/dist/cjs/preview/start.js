"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

var _global = _interopRequireDefault(require("global"));

var _addons = require("@storybook/addons");

var _channelPostmessage = _interopRequireDefault(require("@storybook/channel-postmessage"));

var _clientApi = require("@storybook/client-api");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _url = require("./url");

var _loadCsf = require("./loadCsf");

var _StoryRenderer = require("./StoryRenderer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigator = _global.default.navigator,
    globalWindow = _global.default.window;
var isBrowser = navigator && navigator.userAgent && navigator.userAgent !== 'storyshots' && !(navigator.userAgent.indexOf('Node.js') > -1) && !(navigator.userAgent.indexOf('jsdom') > -1);

function getOrCreateChannel() {
  var channel = null;

  if (isBrowser) {
    try {
      channel = _addons.addons.getChannel();
    } catch (e) {
      channel = (0, _channelPostmessage.default)({
        page: 'preview'
      });

      _addons.addons.setChannel(channel);
    }
  }

  return channel;
}

function getClientApi(decorateStory, channel) {
  var storyStore;
  var clientApi;

  if (typeof globalWindow !== 'undefined' && globalWindow.__STORYBOOK_CLIENT_API__ && globalWindow.__STORYBOOK_STORY_STORE__) {
    clientApi = globalWindow.__STORYBOOK_CLIENT_API__;
    storyStore = globalWindow.__STORYBOOK_STORY_STORE__;
  } else {
    storyStore = new _clientApi.StoryStore({
      channel: channel
    });
    clientApi = new _clientApi.ClientApi({
      storyStore: storyStore,
      decorateStory: decorateStory
    });
  }

  return {
    clientApi: clientApi,
    storyStore: storyStore
  };
}

function focusInInput(event) {
  var target = event.target;
  return /input|textarea/i.test(target.tagName) || target.getAttribute('contenteditable') !== null;
} // todo improve typings


function start(render) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      decorateStory = _ref.decorateStory;

  var channel = getOrCreateChannel();

  var _getClientApi = getClientApi(decorateStory, channel),
      clientApi = _getClientApi.clientApi,
      storyStore = _getClientApi.storyStore;

  var configApi = new _clientApi.ConfigApi({
    storyStore: storyStore
  });
  var storyRenderer = new _StoryRenderer.StoryRenderer({
    render: render,
    channel: channel,
    storyStore: storyStore
  }); // Only try and do URL/event based stuff in a browser context (i.e. not in storyshots)

  if (isBrowser) {
    var selectionSpecifier = (0, _url.getSelectionSpecifierFromPath)();

    if (selectionSpecifier) {
      storyStore.setSelectionSpecifier(selectionSpecifier);
    }

    channel.on(_coreEvents.default.CURRENT_STORY_WAS_SET, _url.setPath); // Handle keyboard shortcuts

    globalWindow.onkeydown = function (event) {
      if (!focusInInput(event)) {
        // We have to pick off the keys of the event that we need on the other side
        var altKey = event.altKey,
            ctrlKey = event.ctrlKey,
            metaKey = event.metaKey,
            shiftKey = event.shiftKey,
            key = event.key,
            code = event.code,
            keyCode = event.keyCode;
        channel.emit(_coreEvents.default.PREVIEW_KEYDOWN, {
          event: {
            altKey: altKey,
            ctrlKey: ctrlKey,
            metaKey: metaKey,
            shiftKey: shiftKey,
            key: key,
            code: code,
            keyCode: keyCode
          }
        });
      }
    };
  }

  if (typeof globalWindow !== 'undefined') {
    globalWindow.__STORYBOOK_CLIENT_API__ = clientApi;
    globalWindow.__STORYBOOK_STORY_STORE__ = storyStore;
    globalWindow.__STORYBOOK_ADDONS_CHANNEL__ = channel; // may not be defined
  }

  var configure = (0, _loadCsf.loadCsf)({
    clientApi: clientApi,
    storyStore: storyStore,
    configApi: configApi
  });
  return {
    configure: configure,
    clientApi: clientApi,
    configApi: configApi,
    channel: channel,
    forceReRender: function forceReRender() {
      return storyRenderer.forceReRender();
    }
  };
}