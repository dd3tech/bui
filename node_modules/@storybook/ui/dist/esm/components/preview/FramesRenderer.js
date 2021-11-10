function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.reduce.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import React, { Fragment, useMemo, useEffect, useState } from 'react';
import { Global } from '@storybook/theming';
import { IFrame } from './iframe';
import { stringifyQueryParams } from './utils/stringifyQueryParams';

var getActive = function getActive(refId) {
  if (refId) {
    return "storybook-ref-".concat(refId);
  }

  return 'storybook-preview-iframe';
};

export var FramesRenderer = function FramesRenderer(_ref) {
  var _refs$refId;

  var refs = _ref.refs,
      story = _ref.story,
      scale = _ref.scale,
      _ref$viewMode = _ref.viewMode,
      viewMode = _ref$viewMode === void 0 ? 'story' : _ref$viewMode,
      refId = _ref.refId,
      _ref$queryParams = _ref.queryParams,
      queryParams = _ref$queryParams === void 0 ? {} : _ref$queryParams,
      baseUrl = _ref.baseUrl,
      _ref$storyId = _ref.storyId,
      storyId = _ref$storyId === void 0 ? '*' : _ref$storyId;
  var version = (_refs$refId = refs[refId]) === null || _refs$refId === void 0 ? void 0 : _refs$refId.version;
  var stringifiedQueryParams = stringifyQueryParams(Object.assign({}, queryParams, version && {
    version: version
  }));
  var active = getActive(refId);
  var styles = useMemo(function () {
    return {
      '[data-is-storybook="false"]': {
        visibility: 'hidden'
      },
      '[data-is-storybook="true"]': {
        visibility: 'visible'
      }
    };
  }, []);

  var _useState = useState({
    'storybook-preview-iframe': "".concat(baseUrl, "?id=").concat(storyId, "&viewMode=").concat(viewMode).concat(stringifiedQueryParams)
  }),
      _useState2 = _slicedToArray(_useState, 2),
      frames = _useState2[0],
      setFrames = _useState2[1];

  useEffect(function () {
    var newFrames = Object.values(refs).filter(function (r) {
      if (r.error) {
        return false;
      }

      if (r.type === 'auto-inject') {
        return true;
      }

      if (story && r.id === story.refId) {
        return true;
      }

      return false;
    }).reduce(function (acc, r) {
      return Object.assign({}, acc, _defineProperty({}, "storybook-ref-".concat(r.id), "".concat(r.url, "/iframe.html?id=").concat(storyId, "&viewMode=").concat(viewMode, "&refId=").concat(r.id).concat(stringifiedQueryParams)));
    }, frames);
    setFrames(newFrames);
  }, [storyId, story, refs]);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Global, {
    styles: styles
  }), Object.entries(frames).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        id = _ref3[0],
        src = _ref3[1];

    return /*#__PURE__*/React.createElement(Fragment, {
      key: id
    }, /*#__PURE__*/React.createElement(IFrame, {
      active: id === active,
      key: refs[id] ? refs[id].url : id,
      id: id,
      title: id,
      src: src,
      allowFullScreen: true,
      scale: scale
    }));
  }));
};
FramesRenderer.displayName = "FramesRenderer";