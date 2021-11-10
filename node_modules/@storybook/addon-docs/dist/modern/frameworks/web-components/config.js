/* global window */
import React from 'react';
import { render } from 'lit-html';
import { extractArgTypes, extractComponentDescription } from './custom-elements';
export const parameters = {
  docs: {
    extractArgTypes,
    extractComponentDescription,
    inlineStories: true,
    prepareForInline: storyFn => {
      class Story extends React.Component {
        constructor(props) {
          super(props);
          this.wrapperRef = /*#__PURE__*/React.createRef();
        }

        componentDidMount() {
          render(storyFn(), this.wrapperRef.current);
        }

        render() {
          return /*#__PURE__*/React.createElement('div', {
            ref: this.wrapperRef
          });
        }

      }

      return /*#__PURE__*/React.createElement(Story);
    }
  }
};