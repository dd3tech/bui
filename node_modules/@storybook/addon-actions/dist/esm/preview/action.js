import "core-js/modules/es.object.assign.js";
import uuidv4 from 'uuid-browser/v4';
import { addons } from '@storybook/addons';
import { EVENT_ID } from '../constants';
import { config } from './configureActions';
export function action(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var actionOptions = Object.assign({}, config, options);

  var handler = function actionHandler() {
    var channel = addons.getChannel();
    var id = uuidv4();
    var minDepth = 5; // anything less is really just storybook internals

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var normalizedArgs = args.length > 1 ? args : args[0];
    var actionDisplayToEmit = {
      id: id,
      count: 0,
      data: {
        name: name,
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