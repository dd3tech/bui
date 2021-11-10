import global from 'global';
import { addons } from '@storybook/addons';
import createChannel from '@storybook/channel-postmessage';
import { ClientApi, ConfigApi, StoryStore } from '@storybook/client-api';
import Events from '@storybook/core-events';
import { getSelectionSpecifierFromPath, setPath } from './url';
import { loadCsf } from './loadCsf';
import { StoryRenderer } from './StoryRenderer';
const {
  navigator,
  window: globalWindow
} = global;
const isBrowser = navigator && navigator.userAgent && navigator.userAgent !== 'storyshots' && !(navigator.userAgent.indexOf('Node.js') > -1) && !(navigator.userAgent.indexOf('jsdom') > -1);

function getOrCreateChannel() {
  let channel = null;

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
  let storyStore;
  let clientApi;

  if (typeof globalWindow !== 'undefined' && globalWindow.__STORYBOOK_CLIENT_API__ && globalWindow.__STORYBOOK_STORY_STORE__) {
    clientApi = globalWindow.__STORYBOOK_CLIENT_API__;
    storyStore = globalWindow.__STORYBOOK_STORY_STORE__;
  } else {
    storyStore = new StoryStore({
      channel
    });
    clientApi = new ClientApi({
      storyStore,
      decorateStory
    });
  }

  return {
    clientApi,
    storyStore
  };
}

function focusInInput(event) {
  const target = event.target;
  return /input|textarea/i.test(target.tagName) || target.getAttribute('contenteditable') !== null;
} // todo improve typings


export default function start(render, {
  decorateStory
} = {}) {
  const channel = getOrCreateChannel();
  const {
    clientApi,
    storyStore
  } = getClientApi(decorateStory, channel);
  const configApi = new ConfigApi({
    storyStore
  });
  const storyRenderer = new StoryRenderer({
    render,
    channel,
    storyStore
  }); // Only try and do URL/event based stuff in a browser context (i.e. not in storyshots)

  if (isBrowser) {
    const selectionSpecifier = getSelectionSpecifierFromPath();

    if (selectionSpecifier) {
      storyStore.setSelectionSpecifier(selectionSpecifier);
    }

    channel.on(Events.CURRENT_STORY_WAS_SET, setPath); // Handle keyboard shortcuts

    globalWindow.onkeydown = event => {
      if (!focusInInput(event)) {
        // We have to pick off the keys of the event that we need on the other side
        const {
          altKey,
          ctrlKey,
          metaKey,
          shiftKey,
          key,
          code,
          keyCode
        } = event;
        channel.emit(Events.PREVIEW_KEYDOWN, {
          event: {
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
            key,
            code,
            keyCode
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

  const configure = loadCsf({
    clientApi,
    storyStore,
    configApi
  });
  return {
    configure,
    clientApi,
    configApi,
    channel,
    forceReRender: () => storyRenderer.forceReRender()
  };
}