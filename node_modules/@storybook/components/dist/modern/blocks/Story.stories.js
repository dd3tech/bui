import React, { useState } from 'react';
import { Story, StoryError } from './Story';
import { Button } from '../Button/Button';
export default {
  title: 'Docs/Story',
  component: Story
};

const buttonFn = () => /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Inline story");

buttonFn.displayName = "buttonFn";

const buttonHookFn = () => {
  const [count, setCount] = useState(0);
  return /*#__PURE__*/React.createElement(Button, {
    secondary: true,
    onClick: () => setCount(count + 1)
  }, `count: ${count}`);
};

buttonHookFn.displayName = "buttonHookFn";
export const Inline = () => /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "hello button"
});
Inline.displayName = "Inline";
export const Error = () => /*#__PURE__*/React.createElement(Story, {
  error: StoryError.NO_STORY
});
Error.displayName = "Error";
export const ReactHook = () => /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonHookFn,
  title: "hello button"
});
ReactHook.displayName = "ReactHook";