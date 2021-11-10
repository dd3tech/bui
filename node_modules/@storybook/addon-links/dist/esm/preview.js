function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.string.search.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import global from 'global';
import qs from 'qs';
import { addons, makeDecorator } from '@storybook/addons';
import { STORY_CHANGED, SELECT_STORY } from '@storybook/core-events';
import { toId } from '@storybook/csf';
import { logger } from '@storybook/client-logger';
import { PARAM_KEY } from './constants';
var document = global.document,
    HTMLElement = global.HTMLElement,
    storyStore = global.__STORYBOOK_STORY_STORE__,
    clientApi = global.__STORYBOOK_CLIENT_API__;
export var navigate = function navigate(params) {
  return addons.getChannel().emit(SELECT_STORY, params);
};

var generateUrl = function generateUrl(id) {
  var location = document.location;
  var query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  return "".concat(location.origin + location.pathname, "?").concat(qs.stringify(Object.assign({}, query, {
    id: id
  }), {
    encode: false
  }));
};

var valueOrCall = function valueOrCall(args) {
  return function (value) {
    return typeof value === 'function' ? value.apply(void 0, _toConsumableArray(args)) : value;
  };
};

export var linkTo = function linkTo(idOrKindInput, storyInput) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var resolver = valueOrCall(args);

    var _storyStore$getSelect = storyStore.getSelection(),
        storyId = _storyStore$getSelect.storyId;

    var current = storyStore.fromId(storyId) || {};
    var kindVal = resolver(idOrKindInput);
    var storyVal = resolver(storyInput);
    var fromid = storyStore.fromId(kindVal);
    var item = fromid || clientApi.raw().find(function (i) {
      if (kindVal && storyVal) {
        return i.kind === kindVal && i.story === storyVal;
      }

      if (!kindVal && storyVal) {
        return i.kind === current.kind && i.story === storyVal;
      }

      if (kindVal && !storyVal) {
        return i.kind === kindVal;
      }

      if (!kindVal && !storyVal) {
        return i.kind === current.kind;
      }

      return false;
    });

    if (item) {
      navigate({
        kind: item.kind,
        story: item.story
      });
    } else {
      logger.error('could not navigate to provided story');
    }
  };
};
export var hrefTo = function hrefTo(kind, name) {
  return new Promise(function (resolve) {
    var _storyStore$getSelect2 = storyStore.getSelection(),
        storyId = _storyStore$getSelect2.storyId;

    var current = storyStore.fromId(storyId);
    resolve(generateUrl(toId(kind || current.kind, name)));
  });
};

var linksListener = function linksListener(e) {
  var target = e.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  var element = target;
  var _element$dataset = element.dataset,
      kind = _element$dataset.sbKind,
      story = _element$dataset.sbStory;

  if (kind || story) {
    e.preventDefault();
    navigate({
      kind: kind,
      story: story
    });
  }
};

var hasListener = false;

var on = function on() {
  if (!hasListener) {
    hasListener = true;
    document.addEventListener('click', linksListener);
  }
};

var off = function off() {
  if (hasListener) {
    hasListener = false;
    document.removeEventListener('click', linksListener);
  }
};

export var withLinks = makeDecorator({
  name: 'withLinks',
  parameterName: PARAM_KEY,
  wrapper: function wrapper(getStory, context, _ref) {
    var parameters = _ref.parameters;
    on();
    addons.getChannel().once(STORY_CHANGED, off);
    return getStory(context);
  }
});