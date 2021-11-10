function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useState, useEffect } from 'react';
import { BooleanControl, ColorControl, DateControl, FilesControl, NumberControl, ObjectControl, OptionsControl, RangeControl, TextControl } from '../../controls';

const NoControl = () => /*#__PURE__*/React.createElement(React.Fragment, null, "-");

export const ArgControl = ({
  row,
  arg,
  updateArgs
}) => {
  const {
    key,
    control
  } = row;
  const [isFocused, setFocused] = useState(false); // box because arg can be a fn (e.g. actions) and useState calls fn's

  const [boxedValue, setBoxedValue] = useState({
    value: arg
  });
  useEffect(() => {
    if (!isFocused) setBoxedValue({
      value: arg
    });
  }, [isFocused, arg]);
  const onChange = useCallback(argVal => {
    setBoxedValue({
      value: argVal
    });
    updateArgs({
      [key]: argVal
    });
    return argVal;
  }, [updateArgs, key]);
  const onBlur = useCallback(() => setFocused(false), []);
  const onFocus = useCallback(() => setFocused(true), []);
  if (!control || control.disable) return /*#__PURE__*/React.createElement(NoControl, null); // row.name is a display name and not a suitable DOM input id or name - i might contain whitespace etc.
  // row.key is a hash key and therefore a much safer choice

  const props = {
    name: key,
    argType: row,
    value: boxedValue.value,
    onChange,
    onBlur,
    onFocus
  };

  switch (control.type) {
    case 'array':
    case 'object':
      return /*#__PURE__*/React.createElement(ObjectControl, _extends({}, props, control));

    case 'boolean':
      return /*#__PURE__*/React.createElement(BooleanControl, _extends({}, props, control));

    case 'color':
      return /*#__PURE__*/React.createElement(ColorControl, _extends({}, props, control));

    case 'date':
      return /*#__PURE__*/React.createElement(DateControl, _extends({}, props, control));

    case 'number':
      return /*#__PURE__*/React.createElement(NumberControl, _extends({}, props, control));

    case 'check':
    case 'inline-check':
    case 'radio':
    case 'inline-radio':
    case 'select':
    case 'multi-select':
      return /*#__PURE__*/React.createElement(OptionsControl, _extends({}, props, control, {
        controlType: control.type
      }));

    case 'range':
      return /*#__PURE__*/React.createElement(RangeControl, _extends({}, props, control));

    case 'text':
      return /*#__PURE__*/React.createElement(TextControl, _extends({}, props, control));

    case 'file':
      return /*#__PURE__*/React.createElement(FilesControl, _extends({}, props, control));

    default:
      return /*#__PURE__*/React.createElement(NoControl, null);
  }
};