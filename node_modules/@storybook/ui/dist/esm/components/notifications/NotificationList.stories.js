import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.regexp.exec.js";
import React from 'react';
import NotificationList from './NotificationList';
import itemMeta, * as itemStories from './NotificationItem.stories';
export default {
  component: NotificationList,
  title: 'UI/Notifications/NotificationList',
  decorators: [function (storyFn) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '240px',
        margin: '1rem',
        position: 'relative',
        height: '100%'
      }
    }, storyFn());
  }],
  excludeStories: /.*Data$/
};
var items = Array.from(Object.entries(itemStories)).filter(function (entry) {
  return itemMeta.excludeStories.exec(entry[0]);
}).map(function (entry) {
  return entry[1];
});
export var singleData = [items[0]];
export var allData = items;

function clearNotification(id) {}

export var single = function single() {
  return /*#__PURE__*/React.createElement(NotificationList, {
    notifications: singleData,
    clearNotification: clearNotification,
    placement: {
      position: 'relative'
    }
  });
};
single.displayName = "single";
export var all = function all() {
  return /*#__PURE__*/React.createElement(NotificationList, {
    notifications: allData,
    clearNotification: clearNotification,
    placement: {
      position: 'relative'
    }
  });
};
all.displayName = "all";
export var placement = function placement() {
  return (
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
    })
  );
};
placement.displayName = "placement";