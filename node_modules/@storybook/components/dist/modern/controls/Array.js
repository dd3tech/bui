import React, { useCallback, useState } from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
import { getControlId } from './helpers';

const parse = (value, separator) => !value || value.trim() === '' ? [] : value.split(separator);

const format = (value, separator) => {
  return value && Array.isArray(value) ? value.join(separator) : '';
};

const Wrapper = styled.label({
  display: 'flex'
});
export const ArrayControl = ({
  name,
  value,
  onChange,
  separator = ',',
  onBlur,
  onFocus
}) => {
  const handleChange = useCallback(e => {
    const {
      value: newVal
    } = e.target;
    onChange(parse(newVal, separator));
  }, [onChange]);
  const [forceVisible, setForceVisible] = useState(false);
  const onForceVisible = useCallback(() => {
    onChange([]);
    setForceVisible(true);
  }, [setForceVisible]);

  if (value === undefined) {
    return /*#__PURE__*/React.createElement(Form.Button, {
      onClick: onForceVisible
    }, "Set array");
  }

  const isValid = Array.isArray(value);
  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Textarea, {
    id: getControlId(name),
    value: format(value, separator),
    onChange: handleChange,
    size: "flex",
    placeholder: "Edit array...",
    valid: isValid ? null : 'error',
    autoFocus: forceVisible,
    name,
    onBlur,
    onFocus
  }));
};
ArrayControl.displayName = "ArrayControl";