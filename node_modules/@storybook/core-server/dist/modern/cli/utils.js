import deprecate from 'util-deprecate';
import dedent from 'ts-dedent';
export function parseList(str) {
  return str.split(',').map(function (item) {
    return item.trim();
  }).filter(function (item) {
    return item.length > 0;
  });
}
export function getEnvConfig(program, configEnv) {
  Object.keys(configEnv).forEach(function (fieldName) {
    var envVarName = configEnv[fieldName];
    var envVarValue = process.env[envVarName];

    if (envVarValue) {
      program[fieldName] = envVarValue; // eslint-disable-line
    }
  });
}
var warnDLLsDeprecated = deprecate(function () {}, dedent`
    DLL-related CLI flags are deprecated, see:
    
    https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-dll-flags
  `);
export function checkDeprecatedFlags(options) {
  if (!options.dll || options.uiDll || options.docsDll) {
    warnDLLsDeprecated();
  }
}