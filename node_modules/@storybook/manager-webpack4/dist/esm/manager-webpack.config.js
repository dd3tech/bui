import "regenerator-runtime/runtime.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.promise.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import path from 'path';
import fse from 'fs-extra';
import { DefinePlugin } from 'webpack';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import VirtualModulePlugin from 'webpack-virtual-modules';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import themingPaths from '@storybook/theming/paths';
import uiPaths from '@storybook/ui/paths';
import readPackage from 'read-pkg-up';
import { resolvePathInStorybookCache, stringifyEnvs, es6Transpiler, getManagerHeadTemplate, getManagerMainTemplate } from '@storybook/core-common';
import { babelLoader } from './babel-loader-manager';
export default /*#__PURE__*/(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var configDir, configType, docsMode, entries, refs, outputDir, previewUrl, versionCheck, releaseNotesData, presets, modern, envs, logLevel, template, headHtmlSnippet, isProd, refsTemplate, _yield$readPackage, version;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configDir = _ref.configDir, configType = _ref.configType, docsMode = _ref.docsMode, entries = _ref.entries, refs = _ref.refs, outputDir = _ref.outputDir, previewUrl = _ref.previewUrl, versionCheck = _ref.versionCheck, releaseNotesData = _ref.releaseNotesData, presets = _ref.presets, modern = _ref.modern;
            _context.next = 3;
            return presets.apply('env');

          case 3:
            envs = _context.sent;
            _context.next = 6;
            return presets.apply('logLevel', undefined);

          case 6:
            logLevel = _context.sent;
            _context.next = 9;
            return presets.apply('managerMainTemplate', getManagerMainTemplate());

          case 9:
            template = _context.sent;
            _context.next = 12;
            return presets.apply('managerHead', getManagerHeadTemplate(configDir, process.env));

          case 12:
            headHtmlSnippet = _context.sent;
            isProd = configType === 'PRODUCTION';
            refsTemplate = fse.readFileSync(path.join(__dirname, 'virtualModuleRef.template.js'), {
              encoding: 'utf8'
            });
            _context.next = 17;
            return readPackage({
              cwd: __dirname
            });

          case 17:
            _yield$readPackage = _context.sent;
            version = _yield$readPackage.packageJson.version;
            return _context.abrupt("return", {
              name: 'manager',
              mode: isProd ? 'production' : 'development',
              bail: isProd,
              devtool: false,
              entry: entries,
              output: {
                path: outputDir,
                filename: isProd ? '[name].[contenthash].manager.bundle.js' : '[name].manager.bundle.js',
                publicPath: ''
              },
              watchOptions: {
                ignored: /node_modules/
              },
              plugins: [refs ? new VirtualModulePlugin(_defineProperty({}, path.resolve(path.join(configDir, "generated-refs.js")), refsTemplate.replace("'{{refs}}'", JSON.stringify(refs)))) : null, new HtmlWebpackPlugin({
                filename: "index.html",
                // FIXME: `none` isn't a known option
                chunksSortMode: 'none',
                alwaysWriteToDisk: true,
                inject: false,
                templateParameters: function templateParameters(compilation, files, options) {
                  return {
                    compilation: compilation,
                    files: files,
                    options: options,
                    version: version,
                    globals: {
                      CONFIG_TYPE: configType,
                      LOGLEVEL: logLevel,
                      VERSIONCHECK: JSON.stringify(versionCheck),
                      RELEASE_NOTES_DATA: JSON.stringify(releaseNotesData),
                      DOCS_MODE: docsMode,
                      // global docs mode
                      PREVIEW_URL: previewUrl // global preview URL

                    },
                    headHtmlSnippet: headHtmlSnippet
                  };
                },
                template: template
              }), new CaseSensitivePathsPlugin(), new Dotenv({
                silent: true
              }), // graphql sources check process variable
              new DefinePlugin({
                'process.env': stringifyEnvs(envs),
                NODE_ENV: JSON.stringify(envs.NODE_ENV)
              }) // isProd &&
              //   BundleAnalyzerPlugin &&
              //   new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
              ].filter(Boolean),
              module: {
                rules: [babelLoader(), es6Transpiler(), {
                  test: /\.css$/,
                  use: [require.resolve('style-loader'), {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1
                    }
                  }]
                }, {
                  test: /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
                  loader: require.resolve('file-loader'),
                  options: {
                    name: isProd ? 'static/media/[name].[contenthash:8].[ext]' : 'static/media/[path][name].[ext]'
                  }
                }, {
                  test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: 10000,
                    name: isProd ? 'static/media/[name].[contenthash:8].[ext]' : 'static/media/[path][name].[ext]'
                  }
                }]
              },
              resolve: {
                extensions: ['.mjs', '.js', '.jsx', '.json', '.cjs', '.ts', '.tsx'],
                modules: ['node_modules'].concat(envs.NODE_PATH || []),
                mainFields: [modern ? 'sbmodern' : null, 'browser', 'module', 'main'].filter(Boolean),
                alias: Object.assign({}, themingPaths, uiPaths),
                plugins: [// Transparently resolve packages via PnP when needed; noop otherwise
                PnpWebpackPlugin]
              },
              resolveLoader: {
                plugins: [PnpWebpackPlugin.moduleLoader(module)]
              },
              recordsPath: resolvePathInStorybookCache('public/records.json'),
              performance: {
                hints: false
              },
              optimization: {
                splitChunks: {
                  chunks: 'all'
                },
                runtimeChunk: true,
                sideEffects: true,
                usedExports: true,
                concatenateModules: true,
                minimizer: isProd ? [new TerserWebpackPlugin({
                  parallel: true,
                  terserOptions: {
                    mangle: false,
                    sourceMap: true,
                    keep_fnames: true
                  }
                })] : []
              }
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();