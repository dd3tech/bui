import globBase from 'glob-base';
import { makeRe } from 'micromatch';
import deprecate from 'util-deprecate';
import dedent from 'ts-dedent'; // LEGACY support for bad glob patterns we had in SB 5 - remove in SB7

var fixBadGlob = deprecate(function (match) {
  return match.input.replace(match[1], `@${match[1]}`);
}, dedent`
    You have specified an invalid glob, we've attempted to fix it, please ensure that the glob you specify is valid. See: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#correct-globs-in-mainjs
  `);

var detectBadGlob = function (val) {
  var match = val.match(/\.(\([^)]+\))/);

  if (match) {
    return fixBadGlob(match);
  }

  return val;
};

var isObject = function (val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

export var toRequireContext = function (input) {
  var fixedInput = detectBadGlob(input);

  switch (true) {
    case typeof input === 'string':
      {
        var _globBase = globBase(fixedInput),
            base = _globBase.base,
            glob = _globBase.glob;

        var recursive = glob.includes('**') || glob.split('/').length > 1;
        var regex = makeRe(glob, {
          fastpaths: false,
          noglobstar: false,
          bash: false
        });
        var source = regex.source;

        if (source.startsWith('^')) {
          // webpack's require.context matches against paths starting `./`
          // Globs starting `**` require special treatment due to the regex they
          // produce, specifically a negative look-ahead
          var match = ['^\\.', glob.startsWith('**') ? '' : '\\/', source.substring(1)].join('');
          return {
            path: base,
            recursive: recursive,
            match: match
          };
        }

        throw new Error(`Invalid glob: >> ${input} >> ${regex}`);
      }

    case isObject(input):
      {
        return input;
      }

    default:
      {
        throw new Error('the provided input cannot be transformed into a require.context');
      }
  }
};
export var toRequireContextString = function (input) {
  var _toRequireContext = toRequireContext(input),
      p = _toRequireContext.path,
      r = _toRequireContext.recursive,
      m = _toRequireContext.match;

  var result = `require.context('${p}', ${r}, /${m}/)`;
  return result;
};