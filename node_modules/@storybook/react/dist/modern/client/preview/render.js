import global from 'global';
import React, { Component, StrictMode, Fragment } from 'react';
import ReactDOM from 'react-dom';
const {
  document,
  FRAMEWORK_OPTIONS
} = global;
const rootEl = document ? document.getElementById('root') : null;

const render = (node, el) => new Promise(resolve => {
  ReactDOM.render(node, el, resolve);
});

class ErrorBoundary extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidMount() {
    const {
      hasError
    } = this.state;
    const {
      showMain
    } = this.props;

    if (!hasError) {
      showMain();
    }
  }

  componentDidCatch(err) {
    const {
      showException
    } = this.props; // message partially duplicates stack, strip it

    showException(err);
  }

  render() {
    const {
      hasError
    } = this.state;
    const {
      children
    } = this.props;
    return hasError ? null : children;
  }

}

const Wrapper = FRAMEWORK_OPTIONS !== null && FRAMEWORK_OPTIONS !== void 0 && FRAMEWORK_OPTIONS.strictMode ? StrictMode : Fragment;
export default async function renderMain({
  storyContext,
  unboundStoryFn,
  showMain,
  showException,
  forceRender
}) {
  const Story = unboundStoryFn;
  const content = /*#__PURE__*/React.createElement(ErrorBoundary, {
    showMain: showMain,
    showException: showException
  }, /*#__PURE__*/React.createElement(Story, storyContext)); // For React 15, StrictMode & Fragment doesn't exists.

  const element = Wrapper ? /*#__PURE__*/React.createElement(Wrapper, null, content) : content; // We need to unmount the existing set of components in the DOM node.
  // Otherwise, React may not recreate instances for every story run.
  // This could leads to issues like below:
  // https://github.com/storybookjs/react-storybook/issues/81
  // But forceRender means that it's the same story, so we want too keep the state in that case.

  if (!forceRender) {
    ReactDOM.unmountComponentAtNode(rootEl);
  }

  await render(element, rootEl);
}