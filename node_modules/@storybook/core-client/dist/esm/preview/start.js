import global from 'global';
import { addons } from '@storybook/addons';
import createChannel from '@storybook/channel-postmessage';
import { ClientApi, ConfigApi, StoryStore } from '@storybook/client-api';
import Events from '@storybook/core-events';
import { getSelectionSpecifierFromPath, setPath } from './url';
import { loadCsf } from './loadCsf';
import { StoryRenderer } from './StoryRenderer';
var navigator = global.navigator,
    globalWindow = global.window;
var isBrowser = navigator && navigator.userAgent && navigator.userAgent !== 'storyshots' && !(navigator.userAgent.indexOf('Node.js') > -1) && !(navigator.userAgent.indexOf('jsdom') > -1);

function getOrCreateChannel() {
  var channel = null;

  if (isBrowser) {
    try {
      channel = addons.getChannel();
    } catch (e) {
      channel = createChannel({
        page: 'preview'
      });
      addons.setChannel(channel);
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
    storyStore = new StoryStore({
      channel: channel
    });
    clientApi = new ClientApi({
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


export default function start(render) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      decorateStory = _ref.decorateStory;

  var channel = getOrCreateChannel();

  var _getClientApi = getClientApi(decorateStory, channel),
      clientApi = _getClientApi.clientApi,
      storyStore = _getClientApi.storyStore;

  var configApi = new ConfigApi({
    storyStore: storyStore
  });
  var storyRenderer = new StoryRenderer({
    render: render,
    channel: channel,
    storyStore: storyStore
  }); // Only try and do URL/event based stuff in a browser context (i.e. not in storyshots)

  if (isBrowser) {
    var selectionSpecifier = getSelectionSpecifierFromPath();

    if (selectionSpecifier) {
      storyStore.setSelectionSpecifier(selectionSpecifier);
    }

    channel.on(Events.CURRENT_STORY_WAS_SET, setPath); // Handle keyboard shortcuts

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
        channel.emit(Events.PREVIEW_KEYDOWN, {
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

  var configure = loadCsf({
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