function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.promise.js";
import path from 'path';
import fs from 'fs-extra';
import glob from 'globby';
import { logger } from '@storybook/node-logger';
import { resolvePathInStorybookCache } from '@storybook/core-common';
import { readCsf } from '@storybook/csf-tools';
export async function extractStoriesJson(ouputFile, storiesGlobs, configDir) {
  if (!storiesGlobs) {
    throw new Error('No stories glob');
  }

  var storyFiles = [];
  await Promise.all(storiesGlobs.map(async function (storiesGlob) {
    var files = await glob(path.join(configDir, storiesGlob));
    storyFiles.push(...files);
  }));
  logger.info(`⚙️ Processing ${storyFiles.length} story files from ${storiesGlobs}`);
  var stories = {};
  await Promise.all(storyFiles.map(async function (absolutePath) {
    var ext = path.extname(absolutePath);
    var relativePath = path.relative(configDir, absolutePath);

    if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
      logger.info(`Skipping ${ext} file ${relativePath}`);
      return;
    }

    try {
      var csf = (await readCsf(absolutePath)).parse();
      csf.stories.forEach(function (story) {
        stories[story.id] = _objectSpread(_objectSpread({}, story), {}, {
          kind: csf.meta.title,
          parameters: _objectSpread(_objectSpread({}, story.parameters), {}, {
            fileName: relativePath
          })
        });
      });
    } catch (err) {
      logger.error(`🚨 Extraction error on ${relativePath}`);
      throw err;
    }
  }));
  await fs.writeJson(ouputFile, {
    v: 3,
    stories: stories
  });
}
var timeout = 30000; // 30s

var step = 100; // .1s

export async function useStoriesJson(router, options) {
  var storiesJson = resolvePathInStorybookCache('stories.json');
  await fs.remove(storiesJson);
  var storiesGlobs = await options.presets.apply('stories');
  extractStoriesJson(storiesJson, storiesGlobs, options.configDir);
  router.use('/stories.json', async function (_req, res) {
    for (var i = 0; i < timeout / step; i += 1) {
      if (fs.existsSync(storiesJson)) {
        // eslint-disable-next-line no-await-in-loop
        var json = await fs.readFile(storiesJson, 'utf-8');
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