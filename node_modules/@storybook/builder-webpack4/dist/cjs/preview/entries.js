"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPreviewEntry = createPreviewEntry;
exports.sortEntries = void 0;

require("core-js/modules/es.promise.js");

var _path = _interopRequireDefault(require("path"));

var _nodeLogger = require("@storybook/node-logger");

var _stable = _interopRequireDefault(require("stable"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _globPromise = _interopRequireDefault(require("glob-promise"));

var _coreCommon = require("@storybook/core-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sortEntries = function (entries) {
  var isGenerated = /generated-(config|other)-entry/;
  var isGeneratedConfig = /(?:preview|config)\..+-generated-config-entry/;
  return (0, _stable.default)(entries.slice(0), function (a, b) {
    // We need to ensure that all parameters and decorators that are added by preview entry-points added by addons happen before any configure() calls executed by the user's preview.js (or config.js), or by main.js:stories.
    // As those addons will create generated entries, this means we need to ensure all generated entries come before all other entries (generated or otherwise).
    switch (true) {
      case !!a.match(isGeneratedConfig) && !!b.match(isGenerated):
        {
          return 1;
        }

      case !!b.match(isGeneratedConfig) && !!a.match(isGenerated):
        {
          return -1;
        }

      default:
        {
          return 0;
        }
    }
  });
};

exports.sortEntries = sortEntries;

var getMainConfigs = function (options) {
  var previewPath = (0, _coreCommon.loadPreviewOrConfigFile)(options);
  return previewPath ? [previewPath] : [];
};

async function createPreviewEntry(options) {
  var configDir = options.configDir,
      presets = options.presets;
  var entries = [...(await presets.apply('previewEntries', [], options)), _path.default.resolve(_path.default.join(configDir, 'storybook-init-framework-entry.js'))];
  var configs = getMainConfigs(options);
  var other = await presets.apply('config', [], options);
  var stories = await presets.apply('stories', [], options);

  if (configs.length > 0) {
    var noun = configs.length === 1 ? 'file' : 'files';

    _nodeLogger.logger.info(`=> Loading ${configs.length} config ${noun} in "${configDir}"`);

    entries.push(...configs.map(function (filename) {
      return `${filename}-generated-config-entry.js`;
    }));
  }

  if (other && other.length > 0) {
    var _noun = other.length === 1 ? 'file' : 'files';

    _nodeLogger.logger.info(`=> Loading ${other.length} other ${_noun} in "${configDir}"`);

    entries.push(...other.map(function (filename) {
      return `${filename}-generated-other-entry.js`;
    }));
  }

  if (stories && stories.length) {
    entries.push(_path.default.resolve(_path.default.join(configDir, `generated-stories-entry.js`)));
    var files = (await Promise.all(stories.map(function (g) {
      return (0, _globPromise.default)(_path.default.isAbsolute(g) ? g : _path.default.join(configDir, g));
    }))).reduce(function (a, b) {
      return a.concat(b);
    });

    if (files.length === 0) {
      _nodeLogger.logger.warn((0, _tsDedent.default)`
        We found no files matching any of the following globs:
        
        ${stories.join('\n')}

        Maybe your glob was invalid?
        see: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#correct-globs-in-mainjs
      `);
    } else {
      _nodeLogger.logger.info(`=> Adding stories defined in "${_path.default.join(configDir, 'main.js')}"`);
    }
  }

  return sortEntries(entries);
}