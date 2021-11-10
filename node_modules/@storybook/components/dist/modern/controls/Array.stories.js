import React, { useState } from 'react';
import { ArrayControl } from './Array';
export default {
  title: 'Controls/Array',
  component: ArrayControl
};

const Template = initialValue => {
  const [value, setValue] = useState(initialValue);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ArrayControl, {
    name: "array",
    value: value,
    onChange: newVal => setValue(newVal),
    separator: ","
  }), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

export const Basic = () => Template(['Bat', 'Cat', 'Rat']);
export const Empty = () => Template([]);
export const Undefined = () => Template(undefined);