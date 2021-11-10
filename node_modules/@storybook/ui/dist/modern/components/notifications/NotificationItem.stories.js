import React from 'react';
import NotificationItem from './NotificationItem';
export default {
  component: NotificationItem,
  title: 'UI/Notifications/NotificationItem',
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      width: '240px',
      margin: '1rem'
    }
  }, storyFn())],
  excludeStories: /.*Data$/
};

const onClear = () => {};

const onDismissNotification = () => {};

const Template = args => /*#__PURE__*/React.createElement(NotificationItem, args);

Template.displayName = "Template";
export const simpleData = {
  id: '1',
  onClear,
  content: {
    headline: 'Storybook cool!'
  }
};
export const simple = Template.bind({});
simple.args = {
  notification: simpleData,
  onDismissNotification
};
export const longHeadlineData = {
  id: '2',
  onClear,
  content: {
    headline: 'This is a long message that extends over two lines!'
  }
};
export const longHeadline = Template.bind({});
longHeadline.args = {
  notification: longHeadlineData,
  onDismissNotification
};
export const linkData = {
  id: '3',
  onClear,
  content: {
    headline: 'Storybook X.X is available! Download now »'
  },
  link: '/some/path'
};
export const link = Template.bind({});
link.args = {
  notification: linkData,
  onDismissNotification
};
export const linkIconWithColorData = {
  id: '4',
  onClear,
  content: {
    headline: 'Storybook with a smile!'
  },
  icon: {
    name: 'facehappy',
    color: 'hotpink'
  },
  link: '/some/path'
};
export const linkIconWithColor = Template.bind({});
linkIconWithColor.args = {
  notification: linkIconWithColorData,
  onDismissNotification
};
export const linkIconWithColorSubHeadlineData = {
  id: '5',
  onClear,
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
export const linkIconWithColorSubHeadline = Template.bind({});
linkIconWithColorSubHeadline.args = {
  notification: linkIconWithColorSubHeadlineData,
  onDismissNotification
};
export const bookIconData = {
  id: '6',
  onClear,
  content: {
    headline: 'Storybook has a book icon!'
  },
  icon: {
    name: 'book'
  }
};
export const bookIcon = Template.bind({});
bookIcon.args = {
  notification: bookIconData,
  onDismissNotification
};
export const strongSubHeadlineData = {
  id: '7',
  onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: /*#__PURE__*/React.createElement("strong", null, "Strong subHeadline")
  },
  icon: {
    name: 'book'
  }
};
export const strongSubHeadline = Template.bind({});
strongSubHeadline.args = {
  notification: strongSubHeadlineData,
  onDismissNotification
};
export const strongEmphasizedSubHeadlineData = {
  id: '8',
  onClear,
  content: {
    headline: 'Storybook cool!',
    subHeadline: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("em", null, "Emphasized"), " normal ", /*#__PURE__*/React.createElement("strong", null, "strong Storybook!"))
  },
  icon: {
    name: 'book'
  }
};
export const strongEmphasizedSubHeadline = Template.bind({});
strongEmphasizedSubHeadline.args = {
  notification: strongEmphasizedSubHeadlineData,
  onDismissNotification
};
export const bookIconSubHeadlineData = {
  id: '9',
  onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: 'Find out more!'
  },
  icon: {
    name: 'book'
  }
};
export const bookIconSubHeadline = Template.bind({});
bookIconSubHeadline.args = {
  notification: bookIconSubHeadlineData,
  onDismissNotification
};
export const bookIconLongSubHeadlineData = {
  id: '10',
  onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: 'Find out more! by clicking on on buttons and downloading some applications. Find out more! by clicking on buttons and downloading some applications'
  },
  icon: {
    name: 'book'
  }
};
export const bookIconLongSubHeadline = Template.bind({});
bookIconLongSubHeadline.args = {
  notification: bookIconLongSubHeadlineData,
  onDismissNotification
};
export const accessibilityIconData = {
  id: '11',
  onClear,
  content: {
    headline: 'Storybook has a accessibility icon!',
    subHeadline: 'It is here!'
  },
  icon: {
    name: 'accessibility'
  }
};
export const accessibilityIcon = Template.bind({});
accessibilityIcon.args = {
  notification: accessibilityIconData,
  onDismissNotification
};
export const accessibilityGoldIconData = {
  id: '12',
  onClear,
  content: {
    headline: 'Accessibility icon!',
    subHeadline: 'It is gold!'
  },
  icon: {
    name: 'accessibility',
    color: 'gold'
  }
};
export const accessibilityGoldIcon = Template.bind({});
accessibilityGoldIcon.args = {
  notification: accessibilityGoldIconData,
  onDismissNotification
};
export const accessibilityGoldIconLongHeadLineNoSubHeadlineData = {
  id: '13',
  onClear,
  content: {
    headline: 'Storybook notifications has a accessibility icon it can be any color!'
  },
  icon: {
    name: 'accessibility',
    color: 'gold'
  }
};
export const accessibilityGoldIconLongHeadLineNoSubHeadline = Template.bind({});
accessibilityGoldIconLongHeadLineNoSubHeadline.args = {
  notification: accessibilityGoldIconLongHeadLineNoSubHeadlineData,
  onDismissNotification
};