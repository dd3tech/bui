import React from 'react';
import { createMemorySource, createHistory } from '@reach/router';
import { Root as App } from './index';
import { PrettyFakeProvider, FakeProvider } from './FakeProvider';
export default {
  title: 'UI/App',
  component: App,
  parameters: {
    layout: 'fullscreen'
  }
};
const history = createHistory(createMemorySource('/?path=/story/story--id'));
export const Default = () => /*#__PURE__*/React.createElement(App, {
  provider: new FakeProvider(),
  history: history
});
Default.displayName = "Default";
export const LoadingState = () => /*#__PURE__*/React.createElement(App, {
  provider: new PrettyFakeProvider(),
  history: history
});
LoadingState.displayName = "LoadingState";