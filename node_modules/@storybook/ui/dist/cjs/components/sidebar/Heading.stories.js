"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noBrand = exports.customBrandImageUnsizedSVG = exports.customBrandImageTall = exports.customBrandImage = exports.longText = exports.onlyText = exports.linkAndText = exports.standardNoLink = exports.standard = exports.standardData = exports.menuHighlighted = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _addonActions = require("@storybook/addon-actions");

var _Heading = require("./Heading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _Heading.Heading,
  title: 'UI/Sidebar/Heading',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: '0 20px',
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
exports.default = _default;
var menuItems = [{
  title: 'Menu Item 1',
  onClick: (0, _addonActions.action)('onActivateMenuItem'),
  id: '1'
}, {
  title: 'Menu Item 2',
  onClick: (0, _addonActions.action)('onActivateMenuItem'),
  id: '2'
}, {
  title: 'Menu Item 3',
  onClick: (0, _addonActions.action)('onActivateMenuItem'),
  id: '3'
}];

var menuHighlighted = function menuHighlighted() {
  return /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menuHighlighted: true,
    menu: menuItems
  });
};

exports.menuHighlighted = menuHighlighted;
menuHighlighted.displayName = "menuHighlighted";
var standardData = {
  menu: menuItems
};
exports.standardData = standardData;

var standard = function standard() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: undefined,
        image: undefined
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.standard = standard;
standard.displayName = "standard";

var standardNoLink = function standardNoLink() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: null,
        image: undefined
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.standardNoLink = standardNoLink;
standardNoLink.displayName = "standardNoLink";

var linkAndText = function linkAndText() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: 'https://example.com',
        image: null
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.linkAndText = linkAndText;
linkAndText.displayName = "linkAndText";

var onlyText = function onlyText() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.onlyText = onlyText;
onlyText.displayName = "onlyText";

var longText = function longText() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title is way to long to actually fit',
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.longText = longText;
longText.displayName = "longText";

var customBrandImage = function customBrandImage() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/150x22'
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.customBrandImage = customBrandImage;
customBrandImage.displayName = "customBrandImage";

var customBrandImageTall = function customBrandImageTall() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/100x150'
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.customBrandImageTall = customBrandImageTall;
customBrandImageTall.displayName = "customBrandImageTall";

var customBrandImageUnsizedSVG = function customBrandImageUnsizedSVG() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://s.cdpn.io/91525/potofgold.svg'
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.customBrandImageUnsizedSVG = customBrandImageUnsizedSVG;
customBrandImageUnsizedSVG.displayName = "customBrandImageUnsizedSVG";

var noBrand = function noBrand() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: null,
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.noBrand = noBrand;
noBrand.displayName = "noBrand";