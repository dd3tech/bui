"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyAllStaticFiles = copyAllStaticFiles;

require("core-js/modules/es.promise.js");

var _chalk = _interopRequireDefault(require("chalk"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _nodeLogger = require("@storybook/node-logger");

var _serverStatics = require("./server-statics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function copyAllStaticFiles(staticDirs, outputDir) {
  if (staticDirs && staticDirs.length > 0) {
    await Promise.all(staticDirs.map(async function (dir) {
      try {
        var _await$parseStaticDir = await (0, _serverStatics.parseStaticDir)(dir),
            staticDir = _await$parseStaticDir.staticDir,
            staticPath = _await$parseStaticDir.staticPath,
            targetDir = _await$parseStaticDir.targetDir;

        var targetPath = _path.default.join(outputDir, targetDir);

        _nodeLogger.logger.info((0, _chalk.default)`=> Copying static files: {cyan ${staticDir}} => {cyan ${targetDir}}`); // Storybook's own files should not be overwritten, so we skip such files if we find them


        var skipPaths = ['index.html', 'iframe.html'].map(function (f) {
          return _path.default.join(targetPath, f);
        });
        await _fsExtra.default.copy(staticPath, targetPath, {
          dereference: true,
          preserveTimestamps: true,
          filter: function (_, dest) {
            return !skipPaths.includes(dest);
          }
        });
      } catch (e) {
        _nodeLogger.logger.error(e.message);

        process.exit(-1);
      }
    }));
  }
}