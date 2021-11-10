import React from 'react';
import NotificationItem from './NotificationItem';
export default {
  component: NotificationItem,
  title: 'UI/Notifications/NotificationItem',
  decorators: [function (storyFn) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '240px',
        margin: '1rem'
      }
    }, storyFn());
  }],
  excludeStories: /.*Data$/
};

var onClear = function onClear() {};

var onDismissNotification = function onDismissNotification() {};

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(NotificationItem, args);
};

Template.displayName = "Template";
export var simpleData = {
  id: '1',
  onClear: onClear,
  content: {
    headline: 'Storybook cool!'
  }
};
export var simple = Template.bind({});
simple.args = {
  notification: simpleData,
  onDismissNotification: onDismissNotification
};
export var longHeadlineData = {
  id: '2',
  onClear: onClear,
  content: {
    headline: 'This is a long message that extends over two lines!'
  }
};
export var longHeadline = Template.bind({});
longHeadline.args = {
  notification: longHeadlineData,
  onDismissNotification: onDismissNotification
};
export var linkData = {
  id: '3',
  onClear: onClear,
  content: {
    headline: 'Storybook X.X is available! Download now »'
  },
  link: '/some/path'
};
export var link = Template.bind({});
link.args = {
  notification: linkData,
  onDismissNotification: onDismissNotification
};
export var linkIconWithColorData = {
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
export var linkIconWithColor = Template.bind({});
linkIconWithColor.args = {
  notification: linkIconWithColorData,
  onDismissNotification: onDismissNotification
};
export var linkIconWithColorSubHeadlineData = {
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
export var linkIconWithColorSubHeadline = Template.bind({});
linkIconWithColorSubHeadline.args = {
  notification: linkIconWithColorSubHeadlineData,
  onDismissNotification: onDismissNotification
};
export var bookIconData = {
  id: '6',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!'
  },
  icon: {
    name: 'book'
  }
};
export var bookIcon = Template.bind({});
bookIcon.args = {
  notification: bookIconData,
  onDismissNotification: onDismissNotification
};
export var strongSubHeadlineData = {
  id: '7',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: /*#__PURE__*/React.createElement("strong", null, "Strong subHeadline")
  },
  icon: {
    name: 'book'
  }
};
export var strongSubHeadline = Template.bind({});
strongSubHeadline.args = {
  notification: strongSubHeadlineData,
  onDismissNotification: onDismissNotification
};
export var strongEmphasizedSubHeadlineData = {
  id: '8',
  onClear: onClear,
  content: {
    headline: 'Storybook cool!',
    subHeadline: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("em", null, "Emphasized"), " normal ", /*#__PURE__*/React.createElement("strong", null, "strong Storybook!"))
  },
  icon: {
    name: 'book'
  }
};
export var strongEmphasizedSubHeadline = Template.bind({});
strongEmphasizedSubHeadline.args = {
  notification: strongEmphasizedSubHeadlineData,
  onDismissNotification: onDismissNotification
};
export var bookIconSubHeadlineData = {
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
export var bookIconSubHeadline = Template.bind({});
bookIconSubHeadline.args = {
  notification: bookIconSubHeadlineData,
  onDismissNotification: onDismissNotification
};
export var bookIconLongSubHeadlineData = {
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
export var bookIconLongSubHeadline = Template.bind({});
bookIconLongSubHeadline.args = {
  notification: bookIconLongSubHeadlineData,
  onDismissNotification: onDismissNotification
};
export var accessibilityIconData = {
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
export var accessibilityIcon = Template.bind({});
accessibilityIcon.args = {
  notification: accessibilityIconData,
  onDismissNotification: onDismissNotification
};
export var accessibilityGoldIconData = {
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
export var accessibilityGoldIcon = Template.bind({});
accessibilityGoldIcon.args = {
  notification: accessibilityGoldIconData,
  onDismissNotification: onDismissNotification
};
export var accessibilityGoldIconLongHeadLineNoSubHeadlineData = {
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
export var accessibilityGoldIconLongHeadLineNoSubHeadline = Template.bind({});
accessibilityGoldIconLongHeadLineNoSubHeadline.args = {
  notification: accessibilityGoldIconLongHeadLineNoSubHeadlineData,
  onDismissNotification: onDismissNotification
};