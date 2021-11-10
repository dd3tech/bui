import React from 'react';
import { ThemeProvider, useTheme } from '@storybook/theming';
import { action } from '@storybook/addon-actions';
import { Heading } from './Heading';
export default {
  component: Heading,
  title: 'UI/Sidebar/Heading',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      maxWidth: '230px'
    }
  }, storyFn())]
};
const menuItems = [{
  title: 'Menu Item 1',
  onClick: action('onActivateMenuItem'),
  id: '1'
}, {
  title: 'Menu Item 2',
  onClick: action('onActivateMenuItem'),
  id: '2'
}, {
  title: 'Menu Item 3',
  onClick: action('onActivateMenuItem'),
  id: '3'
}];
export const menuHighlighted = () => /*#__PURE__*/React.createElement(Heading, {
  menuHighlighted: true,
  menu: menuItems
});
menuHighlighted.displayName = "menuHighlighted";
export const standardData = {
  menu: menuItems
};
export const standard = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: undefined,
        image: undefined
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
standard.displayName = "standard";
export const standardNoLink = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: null,
        image: undefined
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
standardNoLink.displayName = "standardNoLink";
export const linkAndText = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: 'https://example.com',
        image: null
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
linkAndText.displayName = "linkAndText";
export const onlyText = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
onlyText.displayName = "onlyText";
export const longText = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title is way to long to actually fit',
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
longText.displayName = "longText";
export const customBrandImage = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/150x22'
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
customBrandImage.displayName = "customBrandImage";
export const customBrandImageTall = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/100x150'
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
customBrandImageTall.displayName = "customBrandImageTall";
export const customBrandImageUnsizedSVG = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://s.cdpn.io/91525/potofgold.svg'
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
customBrandImageUnsizedSVG.displayName = "customBrandImageUnsizedSVG";
export const noBrand = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: null,
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
noBrand.displayName = "noBrand";