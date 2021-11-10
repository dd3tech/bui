# Storybook Addon Outline

Storybook Addon Outline can be used for visually debugging CSS layout and alignment inside the preview in [Storybook](https://storybook.js.org). Based on [Pesticide](https://github.com/mrmrs/pesticide), it draws outlines around every single element in the preview pane.

![React Storybook Screenshot](https://user-images.githubusercontent.com/42671/98158421-dada2300-1ea8-11eb-8619-af1e7018e1ec.png)

## Getting Started

Requires Storybook 6.1 or later. Install the latest with `npx sb upgrade --prerelease`

First, install the addon

```sh
npm i -D storybook-addon-outline
```

Then, add following content to [`.storybook/main.js`](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project):

```js
module.exports = {
  addons: ['storybook-addon-outline'],
};
```

### Usage

Click on the outline button in the toolbar to toggle the outlines.
