"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractStoriesJson = extractStoriesJson;
exports.useStoriesJson = useStoriesJson;

require("core-js/modules/es.promise.js");

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _globby = _interopRequireDefault(require("globby"));

var _nodeLogger = require("@storybook/node-logger");

var _coreCommon = require("@storybook/core-common");

var _csfTools = require("@storybook/csf-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function extractStoriesJson(ouputFile, storiesGlobs, configDir) {
  if (!storiesGlobs) {
    throw new Error('No stories glob');
  }

  var storyFiles = [];
  await Promise.all(storiesGlobs.map(async function (storiesGlob) {
    var files = await (0, _globby.default)(_path.default.join(configDir, storiesGlob));
    storyFiles.push(...files);
  }));

  _nodeLogger.logger.info(`⚙️ Processing ${storyFiles.length} story files from ${storiesGlobs}`);

  var stories = {};
  await Promise.all(storyFiles.map(async function (absolutePath) {
    var ext = _path.default.extname(absolutePath);

    var relativePath = _path.default.relative(configDir, absolutePath);

    if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
      _nodeLogger.logger.info(`Skipping ${ext} file ${relativePath}`);

      return;
    }

    try {
      var csf = (await (0, _csfTools.readCsf)(absolutePath)).parse();
      csf.stories.forEach(function (story) {
        stories[story.id] = _objectSpread(_objectSpread({}, story), {}, {
          kind: csf.meta.title,
          parameters: _objectSpread(_objectSpread({}, story.parameters), {}, {
            fileName: relativePath
          })
        });
      });
    } catch (err) {
      _nodeLogger.logger.error(`🚨 Extraction error on ${relativePath}`);

      throw err;
    }
  }));
  await _fsExtra.default.writeJson(ouputFile, {
    v: 3,
    stories: stories
  });
}

var timeout = 30000; // 30s

var step = 100; // .1s

async function useStoriesJson(router, options) {
  var storiesJson = (0, _coreCommon.resolvePathInStorybookCache)('stories.json');
  await _fsExtra.default.remove(storiesJson);
  var storiesGlobs = await options.presets.apply('stories');
  extractStoriesJson(storiesJson, storiesGlobs, options.configDir);
  router.use('/stories.json', async function (_req, res) {
    for (var i = 0; i < timeout / step; i += 1) {
      if (_fsExtra.default.existsSync(storiesJson)) {
        // eslint-disable-next-line no-await-in-loop
        var json = await _fsExtra.default.readFile(storiesJson, 'utf-8');
        res.header('Content-Type', 'application/json');
        return res.send(json);
      } // eslint-disable-next-line no-await-in-loop


      await new Promise(function (r) {
        return setTimeout(r, step);
      });
    }

    return res.status(408).send('stories.json timeout');
  });
}