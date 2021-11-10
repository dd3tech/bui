import uuidv4 from 'uuid-browser/v4';
import { addons } from '@storybook/addons';
import { EVENT_ID } from '../constants';
import { config } from './configureActions';
export function action(name, options = {}) {
  const actionOptions = Object.assign({}, config, options);

  const handler = function actionHandler(...args) {
    const channel = addons.getChannel();
    const id = uuidv4();
    const minDepth = 5; // anything less is really just storybook internals

    const normalizedArgs = args.length > 1 ? args : args[0];
    const actionDisplayToEmit = {
      id,
      count: 0,
      data: {
        name,
        args: normalizedArgs
      },
      options: Object.assign({}, actionOptions, {
        depth: minDepth + (actionOptions.depth || 3),
        allowFunction: actionOptions.allowFunction || false
      })
    };
    channel.emit(EVENT_ID, actionDisplayToEmit);
  };

  return handler;
}