"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLinks = exports.hrefTo = exports.linkTo = exports.navigate = void 0;

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

var _global = _interopRequireDefault(require("global"));

var _qs = _interopRequireDefault(require("qs"));

var _addons = require("@storybook/addons");

var _coreEvents = require("@storybook/core-events");

var _csf = require("@storybook/csf");

var _clientLogger = require("@storybook/client-logger");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var document = _global.default.document,
    HTMLElement = _global.default.HTMLElement,
    storyStore = _global.default.__STORYBOOK_STORY_STORE__,
    clientApi = _global.default.__STORYBOOK_CLIENT_API__;

var navigate = function navigate(params) {
  return _addons.addons.getChannel().emit(_coreEvents.SELECT_STORY, params);
};

exports.navigate = navigate;

var generateUrl = function generateUrl(id) {
  var location = document.location;

  var query = _qs.default.parse(location.search, {
    ignoreQueryPrefix: true
  });

  return "".concat(location.origin + location.pathname, "?").concat(_qs.default.stringify(Object.assign({}, query, {
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

var linkTo = function linkTo(idOrKindInput, storyInput) {
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
      _clientLogger.logger.error('could not navigate to provided story');
    }
  };
};

exports.linkTo = linkTo;

var hrefTo = function hrefTo(kind, name) {
  return new Promise(function (resolve) {
    var _storyStore$getSelect2 = storyStore.getSelection(),
        storyId = _storyStore$getSelect2.storyId;

    var current = storyStore.fromId(storyId);
    resolve(generateUrl((0, _csf.toId)(kind || current.kind, name)));
  });
};

exports.hrefTo = hrefTo;

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

var withLinks = (0, _addons.makeDecorator)({
  name: 'withLinks',
  parameterName: _constants.PARAM_KEY,
  wrapper: function wrapper(getStory, context, _ref) {
    var parameters = _ref.parameters;
    on();

    _addons.addons.getChannel().once(_coreEvents.STORY_CHANGED, off);

    return getStory(context);
  }
});
exports.withLinks = withLinks;