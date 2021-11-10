function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import React from 'react';
import { Global, css } from '@emotion/core';
import { Title, Subtitle, DocsPageWrapper } from './DocsPage';
import { ArgsTable, Source, Description } from './index';
import * as Story from './Story.stories';
import * as Preview from './Preview.stories';
import * as argsTable from './ArgsTable/ArgsTable.stories';
import * as source from './Source.stories';
import * as description from './Description.stories';

var _ref = process.env.NODE_ENV === "production" ? {
  name: "11oe0k1",
  styles: "ul,ol{list-style:none;}"
} : {
  name: "11oe0k1",
  styles: "ul,ol{list-style:none;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ibG9ja3MvRG9jc1BhZ2Uuc3Rvcmllcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0JxQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvYmxvY2tzL0RvY3NQYWdlLnN0b3JpZXMudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEdsb2JhbCwgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbmltcG9ydCB7IFRpdGxlLCBTdWJ0aXRsZSwgRG9jc1BhZ2VXcmFwcGVyIH0gZnJvbSAnLi9Eb2NzUGFnZSc7XG5pbXBvcnQgeyBBcmdzVGFibGUsIFNvdXJjZSwgRGVzY3JpcHRpb24gfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCAqIGFzIFN0b3J5IGZyb20gJy4vU3Rvcnkuc3Rvcmllcyc7XG5pbXBvcnQgKiBhcyBQcmV2aWV3IGZyb20gJy4vUHJldmlldy5zdG9yaWVzJztcbmltcG9ydCAqIGFzIGFyZ3NUYWJsZSBmcm9tICcuL0FyZ3NUYWJsZS9BcmdzVGFibGUuc3Rvcmllcyc7XG5pbXBvcnQgKiBhcyBzb3VyY2UgZnJvbSAnLi9Tb3VyY2Uuc3Rvcmllcyc7XG5pbXBvcnQgKiBhcyBkZXNjcmlwdGlvbiBmcm9tICcuL0Rlc2NyaXB0aW9uLnN0b3JpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnRG9jcy9Eb2NzUGFnZScsXG4gIGNvbXBvbmVudDogRG9jc1BhZ2VXcmFwcGVyLFxuICAvLyBUaGUgZ29hbCBvZiB0aGlzIGRlY29yYXRvciBpcyB0byBtaW1pYyBzb21lIENTUyByZXNldC5cbiAgLy8gTGlrZSBUYWlsd2luZCBDU1Mgb3IgQnVsbWEgZG8sIGZvciBleGFtcGxlLlxuICBkZWNvcmF0b3JzOiBbXG4gICAgKHN0b3J5Rm4pID0+IChcbiAgICAgIDw+XG4gICAgICAgIDxHbG9iYWxcbiAgICAgICAgICBzdHlsZXM9e2Nzc2BcbiAgICAgICAgICAgIHVsLFxuICAgICAgICAgICAgb2wge1xuICAgICAgICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGB9XG4gICAgICAgIC8+XG4gICAgICAgIHtzdG9yeUZuKCl9XG4gICAgICA8Lz5cbiAgICApLFxuICBdLFxuICBwYXJhbWV0ZXJzOiB7XG4gICAgbGF5b3V0OiAnZnVsbHNjcmVlbicsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgV2l0aFN1YnRpdGxlID0gKCkgPT4gKFxuICA8RG9jc1BhZ2VXcmFwcGVyPlxuICAgIDxUaXRsZT5Eb2NzUGFnZTwvVGl0bGU+XG4gICAgPFN1YnRpdGxlPlxuICAgICAgV2hhdCB0aGUgRG9jc1BhZ2UgbG9va3MgbGlrZS4gTWVhbnQgdG8gYmUgUUFlZCBpbiBDYW52YXMgdGFiIG5vdCBpbiBEb2NzIHRhYi5cbiAgICA8L1N1YnRpdGxlPlxuICAgIDxEZXNjcmlwdGlvbiB7Li4uZGVzY3JpcHRpb24uVGV4dC5hcmdzfSAvPlxuICAgIDxQcmV2aWV3LlNpbmdsZSAvPlxuICAgIDxBcmdzVGFibGUgey4uLmFyZ3NUYWJsZS5Ob3JtYWwuYXJnc30gLz5cbiAgICA8U291cmNlIHsuLi5zb3VyY2UuSlNYLmFyZ3N9IC8+XG4gIDwvRG9jc1BhZ2VXcmFwcGVyPlxuKTtcblxuZXhwb3J0IGNvbnN0IEVtcHR5ID0gKCkgPT4gKFxuICA8RG9jc1BhZ2VXcmFwcGVyPlxuICAgIDxTdG9yeS5FcnJvciAvPlxuICAgIDxBcmdzVGFibGUgey4uLmFyZ3NUYWJsZS5FcnJvci5hcmdzfSAvPlxuICAgIDxTb3VyY2Ugey4uLnNvdXJjZS5Tb3VyY2VVbmF2YWlsYWJsZS5hcmdzfSAvPlxuICA8L0RvY3NQYWdlV3JhcHBlcj5cbik7XG5cbmV4cG9ydCBjb25zdCBOb1RleHQgPSAoKSA9PiAoXG4gIDxEb2NzUGFnZVdyYXBwZXI+XG4gICAgPFRpdGxlPm5vIHRleHQ8L1RpdGxlPlxuICAgIDxQcmV2aWV3LlNpbmdsZSAvPlxuICAgIDxBcmdzVGFibGUgey4uLmFyZ3NUYWJsZS5Ob3JtYWwuYXJnc30gLz5cbiAgICA8U291cmNlIHsuLi5zb3VyY2UuSlNYLmFyZ3N9IC8+XG4gIDwvRG9jc1BhZ2VXcmFwcGVyPlxuKTtcblxuZXhwb3J0IGNvbnN0IFRleHQgPSAoKSA9PiAoXG4gIDxEb2NzUGFnZVdyYXBwZXI+XG4gICAgPFRpdGxlPlNlbnNvcml1bTwvVGl0bGU+XG4gICAgPERlc2NyaXB0aW9uIHsuLi5kZXNjcmlwdGlvbi5UZXh0LmFyZ3N9IC8+XG4gICAgPFByZXZpZXcuU2luZ2xlIC8+XG4gICAgPEFyZ3NUYWJsZSB7Li4uYXJnc1RhYmxlLk5vcm1hbC5hcmdzfSAvPlxuICAgIDxTb3VyY2Ugey4uLnNvdXJjZS5KU1guYXJnc30gLz5cbiAgPC9Eb2NzUGFnZVdyYXBwZXI+XG4pO1xuXG5leHBvcnQgY29uc3QgTWFya2Rvd24gPSAoKSA9PiAoXG4gIDxEb2NzUGFnZVdyYXBwZXI+XG4gICAgPFRpdGxlPm1hcmtkb3duPC9UaXRsZT5cbiAgICA8RGVzY3JpcHRpb24gey4uLmRlc2NyaXB0aW9uLk1hcmtkb3duLmFyZ3N9IC8+XG4gICAgPFByZXZpZXcuU2luZ2xlIC8+XG4gICAgPEFyZ3NUYWJsZSB7Li4uYXJnc1RhYmxlLk5vcm1hbC5hcmdzfSAvPlxuICAgIDxTb3VyY2Ugey4uLnNvdXJjZS5KU1guYXJnc30gLz5cbiAgPC9Eb2NzUGFnZVdyYXBwZXI+XG4pO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

export default {
  title: 'Docs/DocsPage',
  component: DocsPageWrapper,
  // The goal of this decorator is to mimic some CSS reset.
  // Like Tailwind CSS or Bulma do, for example.
  decorators: [storyFn => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Global, {
    styles: _ref
  }), storyFn())],
  parameters: {
    layout: 'fullscreen'
  }
};
export const WithSubtitle = () => /*#__PURE__*/React.createElement(DocsPageWrapper, null, /*#__PURE__*/React.createElement(Title, null, "DocsPage"), /*#__PURE__*/React.createElement(Subtitle, null, "What the DocsPage looks like. Meant to be QAed in Canvas tab not in Docs tab."), /*#__PURE__*/React.createElement(Description, description.Text.args), /*#__PURE__*/React.createElement(Preview.Single, null), /*#__PURE__*/React.createElement(ArgsTable, argsTable.Normal.args), /*#__PURE__*/React.createElement(Source, source.JSX.args));
WithSubtitle.displayName = "WithSubtitle";
export const Empty = () => /*#__PURE__*/React.createElement(DocsPageWrapper, null, /*#__PURE__*/React.createElement(Story.Error, null), /*#__PURE__*/React.createElement(ArgsTable, argsTable.Error.args), /*#__PURE__*/React.createElement(Source, source.SourceUnavailable.args));
Empty.displayName = "Empty";
export const NoText = () => /*#__PURE__*/React.createElement(DocsPageWrapper, null, /*#__PURE__*/React.createElement(Title, null, "no text"), /*#__PURE__*/React.createElement(Preview.Single, null), /*#__PURE__*/React.createElement(ArgsTable, argsTable.Normal.args), /*#__PURE__*/React.createElement(Source, source.JSX.args));
NoText.displayName = "NoText";
export const Text = () => /*#__PURE__*/React.createElement(DocsPageWrapper, null, /*#__PURE__*/React.createElement(Title, null, "Sensorium"), /*#__PURE__*/React.createElement(Description, description.Text.args), /*#__PURE__*/React.createElement(Preview.Single, null), /*#__PURE__*/React.createElement(ArgsTable, argsTable.Normal.args), /*#__PURE__*/React.createElement(Source, source.JSX.args));
Text.displayName = "Text";
export const Markdown = () => /*#__PURE__*/React.createElement(DocsPageWrapper, null, /*#__PURE__*/React.createElement(Title, null, "markdown"), /*#__PURE__*/React.createElement(Description, description.Markdown.args), /*#__PURE__*/React.createElement(Preview.Single, null), /*#__PURE__*/React.createElement(ArgsTable, argsTable.Normal.args), /*#__PURE__*/React.createElement(Source, source.JSX.args));
Markdown.displayName = "Markdown";