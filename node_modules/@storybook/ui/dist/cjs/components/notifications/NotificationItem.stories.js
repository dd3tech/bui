"use strict";

require("core-js/modules/es.string.link.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessibilityGoldIconLongHeadLineNoSubHeadline = exports.accessibilityGoldIconLongHeadLineNoSubHeadlineData = exports.accessibilityGoldIcon = exports.accessibilityGoldIconData = exports.accessibilityIcon = exports.accessibilityIconData = exports.bookIconLongSubHeadline = exports.bookIconLongSubHeadlineData = exports.bookIconSubHeadline = exports.bookIconSubHeadlineData = exports.strongEmphasizedSubHeadline = exports.strongEmphasizedSubHeadlineData = exports.strongSubHeadline = exports.strongSubHeadlineData = exports.bookIcon = exports.bookIconData = exports.linkIconWithColorSubHeadline = exports.linkIconWithColorSubHeadlineData = exports.linkIconWithColor = exports.linkIconWithColorData = exports.link = exports.linkData = exports.longHeadline = exports.longHeadlineData = exports.simple = exports.simpleData = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _NotificationItem = _interopRequireDefault(require("./NotificationItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _NotificationItem.default,
  title: 'UI/Notifications/NotificationItem',
  decorators: [function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '240px',
        margin: '1rem'
      }
    }, storyFn());
  }],
  excludeStories: /.*Data$/
};
exports.default = _default;

var onClear = function onClear() {};

var onDismissNotification = function onDismissNotification() {};

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(_NotificationItem.default, args);
};

Template.displayName = "Template";
var simpleData = {
  id: '1',
  onClear: onClear,
  content: {
    headline: 'Storybook cool!'
  }
};
exports.simpleData = simpleData;
var simple = Template.bind({});
exports.simple = simple;
simple.args = {
  notification: simpleData,
  onDismissNotification: onDismissNotification
};
var longHeadlineData = {
  id: '2',
  onClear: onClear,
  content: {
    headline: 'This is a long message that extends over two lines!'
  }
};
exports.longHeadlineData = longHeadlineData;
var longHeadline = Template.bind({});
exports.longHeadline = longHeadline;
longHeadline.args = {
  notification: longHeadlineData,
  onDismissNotification: onDismissNotification
};
var linkData = {
  id: '3',
  onClear: onClear,
  content: {
    headline: 'Storybook X.X is available! Download now »'
  },
  link: '/some/path'
};
exports.linkData = linkData;
var link = Template.bind({});
exports.link = link;
link.args = {
  notification: linkData,
  onDismissNotification: onDismissNotification
};
var linkIconWithColorData = {
  id: '4',
  onClear: onClear,
  content: {
    headline: 'Storybook with a smile!'
  },
  icon: {
    name: 'facehappy',
    color: 'hotpink'
  },
  link: '/some/path'
};
exports.linkIconWithColorData = linkIconWithColorData;
var linkIconWithColor = Template.bind({});
exports.linkIconWithColor = linkIconWithColor;
linkIconWithColor.args = {
  notification: linkIconWithColorData,
  onDismissNotification: onDismissNotification
};
var linkIconWithColorSubHeadlineData = {
  id: '5',
  onClear: onClear,
  content: {
    headline: 'Storybook X.X is available with a smile! Download now »',
    subHeadline: 'This link also has a sub headline'
  },
  icon: {
    name: 'facehappy',
    color: 'tomato'
  },
  link: '/some/path'
};
exports.linkIconWithColorSubHeadlineData = linkIconWithColorSubHeadlineData;
var linkIconWithColorSubHeadline = Template.bind({});
exports.linkIconWithColorSubHeadline = linkIconWithColorSubHeadline;
linkIconWithColorSubHeadline.args = {
  notification: linkIconWithColorSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var bookIconData = {
  id: '6',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!'
  },
  icon: {
    name: 'book'
  }
};
exports.bookIconData = bookIconData;
var bookIcon = Template.bind({});
exports.bookIcon = bookIcon;
bookIcon.args = {
  notification: bookIconData,
  onDismissNotification: onDismissNotification
};
var strongSubHeadlineData = {
  id: '7',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: /*#__PURE__*/_react.default.createElement("strong", null, "Strong subHeadline")
  },
  icon: {
    name: 'book'
  }
};
exports.strongSubHeadlineData = strongSubHeadlineData;
var strongSubHeadline = Template.bind({});
exports.strongSubHeadline = strongSubHeadline;
strongSubHeadline.args = {
  notification: strongSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var strongEmphasizedSubHeadlineData = {
  id: '8',
  onClear: onClear,
  content: {
    headline: 'Storybook cool!',
    subHeadline: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("em", null, "Emphasized"), " normal ", /*#__PURE__*/_react.default.createElement("strong", null, "strong Storybook!"))
  },
  icon: {
    name: 'book'
  }
};
exports.strongEmphasizedSubHeadlineData = strongEmphasizedSubHeadlineData;
var strongEmphasizedSubHeadline = Template.bind({});
exports.strongEmphasizedSubHeadline = strongEmphasizedSubHeadline;
strongEmphasizedSubHeadline.args = {
  notification: strongEmphasizedSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var bookIconSubHeadlineData = {
  id: '9',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: 'Find out more!'
  },
  icon: {
    name: 'book'
  }
};
exports.bookIconSubHeadlineData = bookIconSubHeadlineData;
var bookIconSubHeadline = Template.bind({});
exports.bookIconSubHeadline = bookIconSubHeadline;
bookIconSubHeadline.args = {
  notification: bookIconSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var bookIconLongSubHeadlineData = {
  id: '10',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: 'Find out more! by clicking on on buttons and downloading some applications. Find out more! by clicking on buttons and downloading some applications'
  },
  icon: {
    name: 'book'
  }
};
exports.bookIconLongSubHeadlineData = bookIconLongSubHeadlineData;
var bookIconLongSubHeadline = Template.bind({});
exports.bookIconLongSubHeadline = bookIconLongSubHeadline;
bookIconLongSubHeadline.args = {
  notification: bookIconLongSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var accessibilityIconData = {
  id: '11',
  onClear: onClear,
  content: {
    headline: 'Storybook has a accessibility icon!',
    subHeadline: 'It is here!'
  },
  icon: {
    name: 'accessibility'
  }
};
exports.accessibilityIconData = accessibilityIconData;
var accessibilityIcon = Template.bind({});
exports.accessibilityIcon = accessibilityIcon;
accessibilityIcon.args = {
  notification: accessibilityIconData,
  onDismissNotification: onDismissNotification
};
var accessibilityGoldIconData = {
  id: '12',
  onClear: onClear,
  content: {
    headline: 'Accessibility icon!',
    subHeadline: 'It is gold!'
  },
  icon: {
    name: 'accessibility',
    color: 'gold'
  }
};
exports.accessibilityGoldIconData = accessibilityGoldIconData;
var accessibilityGoldIcon = Template.bind({});
exports.accessibilityGoldIcon = accessibilityGoldIcon;
accessibilityGoldIcon.args = {
  notification: accessibilityGoldIconData,
  onDismissNotification: onDismissNotification
};
var accessibilityGoldIconLongHeadLineNoSubHeadlineData = {
  id: '13',
  onClear: onClear,
  content: {
    headline: 'Storybook notifications has a accessibility icon it can be any color!'
  },
  icon: {
    name: 'accessibility',
    color: 'gold'
  }
};
exports.accessibilityGoldIconLongHeadLineNoSubHeadlineData = accessibilityGoldIconLongHeadLineNoSubHeadlineData;
var accessibilityGoldIconLongHeadLineNoSubHeadline = Template.bind({});
exports.accessibilityGoldIconLongHeadLineNoSubHeadline = accessibilityGoldIconLongHeadLineNoSubHeadline;
accessibilityGoldIconLongHeadLineNoSubHeadline.args = {
  notification: accessibilityGoldIconLongHeadLineNoSubHeadlineData,
  onDismissNotification: onDismissNotification
};