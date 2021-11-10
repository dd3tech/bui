import { loadManagerOrAddonsFile } from '@storybook/core-common';
import createDevConfig from '../manager-webpack.config';
export async function managerWebpack(_, options) {
  return createDevConfig(options);
}
export async function managerEntries(installedAddons, options) {
  const {
    managerEntry = '@storybook/core-client/dist/esm/manager'
  } = options;
  const entries = options.modern ? [] : [require.resolve('@storybook/core-client/dist/esm/globals/polyfills')];

  if (installedAddons && installedAddons.length) {
    entries.push(...installedAddons);
  }

  const managerConfig = loadManagerOrAddonsFile(options);

  if (managerConfig) {
    entries.push(managerConfig);
  }

  entries.push(require.resolve(managerEntry));
  return entries;
}