# DD360 React Components

[![size](https://badgen.net/bundlephobia/min/dd360-ds)](https://www.npmjs.com/package/dd360-ds)
[![minzip size](https://badgen.net/bundlephobia/minzip/dd360-ds)](https://www.npmjs.com/package/dd360-ds)
[![version](https://badgen.net/npm/v/dd360-ds)](https://www.npmjs.com/package/dd360-ds)
[![types](https://badgen.net/npm/types/dd360-ds)](https://www.npmjs.com/package/dd360-ds)
[![license](https://badgen.net/npm/license/dd360-ds)](https://www.npmjs.com/package/dd360-ds)

DD360 Components is a tailwind based React component library

***You do not need to have tailwind installed to use this library. However it can be 100% compatible with tailwind and you should not have any problem if you want to combine them.***


## ⚙️ Minimum requirements
![node](https://shields.io/badge/node-v16+-lightgray?logo=nodedotjs&logoWidth=20&style=for-the-badge)
![npm](https://shields.io/badge/npm-v7+-lightgrey?logo=npm&logoWidth=20&style=for-the-badge)

## 🔮 Links

- [storybook](https://main--62ffec7466615c40c8dbe435.chromatic.com/)
- [npm](https://www.npmjs.com/package/dd360-ds)
- [github](https://github.com/dd3tech/dd360-components)
- [website](https://dd360-ds.netlify.app/)

## 🧪 Testing

we use [vitest](https://vitest.dev/) for unit tests

## 📲 Instalation

```bash
npm install dd360-ds
```

## 💡 Usage

After Installation, you will have to make some extra configurations for everything to work normally.

Import stylesheets into the `App.js` or `App.tsx`

```js
import 'dd360-ds/dd360.css'
```

***⚠️Warning: If you want to combine it with other styles, be sure to import our css as the last one.***


How to import components?

```jsx
import { Button } from 'dd360-ds'
```

## 💅 Customize theme

If you want to use a provider to configure the library's theme, you can do so using the ThemeProvider provided by dd360-ds. This will allow you to set your own settings for the theme.

To use the ThemeProvider, you must import it as follows:

```tsx
import { createTheme, ThemeProvider } from "dd360-ds/theme";
```

You can then create your own theme configuration using the createTheme function, which accepts an object with different properties to customize the theme. For example, you can define the primary and secondary colors as shown below:

```tsx
const theme = createTheme({
  palette: {
    primary: {
      main: "purple"
    },
    secondary: {
      main: "#FFC107"
    }
  }
});
```

After creating your theme configuration, you can use the ThemeProvider to wrap your React app. This can be done as follows:

```tsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
```

Within the ThemeProvider, you can use the components provided by dd360-ds and the corresponding styles will be applied based on your theme settings.

Remember that to use the ThemeProvider, you must import both the createTheme component and the ThemeProvider component from dd360-ds/theme.


## 🔫 Components

This is the most fun part. Below we will explain the use of the components we are currently developing.

You can checking and contribute to the docs website [here](https://github.com/dd3tech/dd360-components-docs)

