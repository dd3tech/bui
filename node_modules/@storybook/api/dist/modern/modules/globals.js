import { SET_STORIES, UPDATE_GLOBALS, GLOBALS_UPDATED } from '@storybook/core-events';
import { logger } from '@storybook/client-logger';
import deepEqual from 'fast-deep-equal';
import { getEventMetadata } from '../lib/events';
export const init = ({
  store,
  fullAPI
}) => {
  const api = {
    updateGlobals(newGlobals) {
      // Only emit the message to the local ref
      fullAPI.emit(UPDATE_GLOBALS, {
        globals: newGlobals,
        options: {
          target: 'storybook-preview-iframe'
        }
      });
    }

  };
  const state = {
    // Currently global args always start empty. TODO -- should this be set on the channel at init time?
    globals: {}
  };

  const updateGlobals = globals => {
    var _store$getState;

    const currentGlobals = (_store$getState = store.getState()) === null || _store$getState === void 0 ? void 0 : _store$getState.globals;

    if (!deepEqual(globals, currentGlobals)) {
      store.setState({
        globals
      });
    }
  };

  const initModule = () => {
    fullAPI.on(GLOBALS_UPDATED, function handleGlobalsUpdated({
      globals
    }) {
      const {
        ref
      } = getEventMetadata(this, fullAPI);

      if (!ref) {
        updateGlobals(globals);
      } else {
        logger.warn('received a GLOBALS_UPDATED from a non-local ref. This is not currently supported.');
      }
    });
    fullAPI.on(SET_STORIES, function handleSetStories({
      globals
    }) {
      const {
        ref
      } = getEventMetadata(this, fullAPI);

      if (!ref) {
        updateGlobals(globals);
      } else if (Object.keys(globals).length > 0) {
        logger.warn('received globals from a non-local ref. This is not currently supported.');
      }
    });
  };

  return {
    api,
    state,
    init: initModule
  };
};