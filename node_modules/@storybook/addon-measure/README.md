<img src="https://user-images.githubusercontent.com/42671/119589951-dbcd9600-bda1-11eb-9227-078f3cfc1e74.png" width="200" height="200">

# Storybook Addon Measure

Storybook addon for inspecting layouts and visualizing the box model.

1. Hold down the <kbd>m</kbd> key:

2. Hover over a DOM node

3. Storybook will display the dimensions of the selected element—margin, padding, border, width and height—in pixels.

![](https://user-images.githubusercontent.com/42671/119589961-dff9b380-bda1-11eb-9550-7ae28bc70bf4.gif)

## Usage

1. This addon requires Storybook 6.3 or later. Install the latest with `npx sb upgrade --prerelease`

2. Install the addon:

```sh
npm i -D @storybook/addon-measure
```

3. Add `"@storybook/addon-measure"` to the addons array in your `.storybook/main.js`:

```js
module.exports = {
  addons: ["@storybook/addon-measure"],
};
```

### Inspiration

- [Inspx](https://github.com/raunofreiberg/inspx) by Rauno Freiberg
- [Aaron Westbrook's script](https://gist.github.com/awestbro/e668c12662ad354f02a413205b65fce7)
- [Visbug](https://visbug.web.app/) from the Chrome team

## Contributing

### Development scripts

Clone the repository and install dependencies.

```sh
yarn
```

- `yarn start` runs babel in watch mode and starts Storybook
- `yarn build` build and package your addon code

## Release Management

### Setup

This project is configured to use [auto](https://github.com/intuit/auto) for release management. It generates a changelog and pushes it to both GitHub and npm. Therefore, you need to configure access to both:

- [`NPM_TOKEN`](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-access-tokens) Create a token with both _Read and Publish_ permissions.
- [`GH_TOKEN`](https://github.com/settings/tokens) Create a token with the `repo` scope.

Add them to the `.env` file at the root of your project:

```bash
GH_TOKEN=<value you just got from GitHub>
NPM_TOKEN=<value you just got from npm>
```

### Creating a releasing

To create a release locally you can run the following command, otherwise the GitHub action will make the release for you.

```sh
yarn release
```

That will:

- Build and package the addon code
- Bump the version
- Push a release to GitHub and npm
- Push a changelog to GitHub
