import mapValues from 'lodash/mapValues';

const normalizeType = type => typeof type === 'string' ? {
  name: type
} : type;

const normalizeControl = control => typeof control === 'string' ? {
  type: control
} : control;

export const normalizeArgTypes = argTypes => mapValues(argTypes, argType => {
  if (!argType) return argType;
  const normalized = Object.assign({}, argType);
  const {
    type,
    control
  } = argType;
  if (type) normalized.type = normalizeType(type);
  if (control) normalized.control = normalizeControl(control);
  return normalized;
});