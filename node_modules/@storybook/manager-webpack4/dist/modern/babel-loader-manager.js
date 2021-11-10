import { getProjectRoot, babelConfig } from '@storybook/core-common';
const {
  plugins,
  presets
} = babelConfig();
export const babelLoader = () => ({
  test: /\.(mjs|tsx?|jsx?)$/,
  use: [{
    loader: require.resolve('babel-loader'),
    options: {
      sourceType: 'unambiguous',
      presets: [...presets, require.resolve('@babel/preset-react')],
      plugins: [...plugins, // Should only be done on manager. Template literals are not meant to be
      // transformed for frameworks like ember
      require.resolve('@babel/plugin-transform-template-literals')]
    }
  }],
  include: [getProjectRoot()],
  exclude: [/node_modules/, /dist/]
});