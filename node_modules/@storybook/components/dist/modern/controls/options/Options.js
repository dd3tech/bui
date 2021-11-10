function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.array.reduce.js";
import React from 'react';
import dedent from 'ts-dedent';
import { once } from '@storybook/client-logger';
import { CheckboxControl } from './Checkbox';
import { RadioControl } from './Radio';
import { SelectControl } from './Select';

/**
 * Options can accept `options` in two formats:
 * - array: ['a', 'b', 'c'] OR
 * - object: { a: 1, b: 2, c: 3 } (deprecated)
 *
 * We always normalize to the more generalized object format and ONLY handle
 * the object format in the underlying control implementations.
 *
 * While non-primitive values are deprecated, they might still not be valid
 * object keys, so the resulting object is a Label -> Value mapping.
 */
const normalizeOptions = (options, labels) => {
  if (Array.isArray(options)) {
    return options.reduce((acc, item) => {
      acc[(labels === null || labels === void 0 ? void 0 : labels[item]) || String(item)] = item;
      return acc;
    }, {});
  }

  return options;
};

export const OptionsControl = props => {
  const {
    type = 'select',
    options,
    labels,
    argType
  } = props;
  const normalized = Object.assign({}, props, {
    options: normalizeOptions(options || argType.options, labels)
  });

  if (options) {
    once.warn(dedent`
      'control.options' is deprecated and will be removed in Storybook 7.0. Define 'options' directly on the argType instead, and use 'control.labels' for custom labels.

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-controloptions
    `);
  }

  switch (type) {
    case 'check':
    case 'inline-check':
      return /*#__PURE__*/React.createElement(CheckboxControl, _extends({}, normalized, {
        isInline: type === 'inline-check'
      }));

    case 'radio':
    case 'inline-radio':
      return /*#__PURE__*/React.createElement(RadioControl, _extends({}, normalized, {
        isInline: type === 'inline-radio'
      }));

    case 'select':
    case 'multi-select':
      return /*#__PURE__*/React.createElement(SelectControl, _extends({}, normalized, {
        isMulti: type === 'multi-select'
      }));

    default:
      throw new Error(`Unknown options type: ${type}`);
  }
};