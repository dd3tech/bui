function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.string.trim.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
import React, { useCallback, useState } from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
import { getControlId } from './helpers';

var parse = function parse(value, separator) {
  return !value || value.trim() === '' ? [] : value.split(separator);
};

var format = function format(value, separator) {
  return value && Array.isArray(value) ? value.join(separator) : '';
};

var Wrapper = styled.label({
  display: 'flex'
});
export var ArrayControl = function ArrayControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      _ref$separator = _ref.separator,
      separator = _ref$separator === void 0 ? ',' : _ref$separator,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;
  var handleChange = useCallback(function (e) {
    var newVal = e.target.value;
    onChange(parse(newVal, separator));
  }, [onChange]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      forceVisible = _useState2[0],
      setForceVisible = _useState2[1];

  var onForceVisible = useCallback(function () {
    onChange([]);
    setForceVisible(true);
  }, [setForceVisible]);

  if (value === undefined) {
    return /*#__PURE__*/React.createElement(Form.Button, {
      onClick: onForceVisible
    }, "Set array");
  }

  var isValid = Array.isArray(value);
  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Textarea, {
    id: getControlId(name),
    value: format(value, separator),
    onChange: handleChange,
    size: "flex",
    placeholder: "Edit array...",
    valid: isValid ? null : 'error',
    autoFocus: forceVisible,
    name: name,
    onBlur: onBlur,
    onFocus: onFocus
  }));
};
ArrayControl.displayName = "ArrayControl";