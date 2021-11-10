import React from 'react';
import NotificationList from './NotificationList';
import itemMeta, * as itemStories from './NotificationItem.stories';
export default {
  component: NotificationList,
  title: 'UI/Notifications/NotificationList',
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      width: '240px',
      margin: '1rem',
      position: 'relative',
      height: '100%'
    }
  }, storyFn())],
  excludeStories: /.*Data$/
};
const items = Array.from(Object.entries(itemStories)).filter(entry => itemMeta.excludeStories.exec(entry[0])).map(entry => entry[1]);
export const singleData = [items[0]];
export const allData = items;

function clearNotification(id) {}

export const single = () => /*#__PURE__*/React.createElement(NotificationList, {
  notifications: singleData,
  clearNotification: clearNotification,
  placement: {
    position: 'relative'
  }
});
single.displayName = "single";
export const all = () => /*#__PURE__*/React.createElement(NotificationList, {
  notifications: allData,
  clearNotification: clearNotification,
  placement: {
    position: 'relative'
  }
});
all.displayName = "all";
export const placement = () =>
/*#__PURE__*/
// Note: position:absolute is only for QA/testing. Use position:fixed when integrating into the real UI.
React.createElement(NotificationList, {
  placement: {
    position: 'absolute',
    left: 20,
    bottom: 20
  },
  clearNotification: clearNotification,
  notifications: allData
});
placement.displayName = "placement";