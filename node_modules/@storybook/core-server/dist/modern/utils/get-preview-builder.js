import "core-js/modules/es.promise.js";
import path from 'path';
import { getInterpretedFile, serverRequire } from '@storybook/core-common';
export async function getPreviewBuilder(configDir) {
  var main = path.resolve(configDir, 'main');
  var mainFile = getInterpretedFile(main);

  var _ref = mainFile ? serverRequire(mainFile) : {
    core: null
  },
      core = _ref.core;

  var builder = core === null || core === void 0 ? void 0 : core.builder;
  var builderPackage = builder ? require.resolve(['webpack4', 'webpack5'].includes(builder) ? `@storybook/builder-${builder}` : builder, {
    paths: [main]
  }) : require.resolve('@storybook/builder-webpack4');
  var previewBuilder = await import(builderPackage);
  return previewBuilder;
}