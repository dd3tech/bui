import "core-js/modules/es.promise.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import path from 'path';
import fse from 'fs-extra';
import { DefinePlugin, HotModuleReplacementPlugin, ProgressPlugin } from 'webpack';
import Dotenv from 'dotenv-webpack'; // @ts-ignore

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import VirtualModulePlugin from 'webpack-virtual-modules';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'; // @ts-ignore

import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import themingPaths from '@storybook/theming/paths';
import { toRequireContextString, stringifyEnvs, es6Transpiler, interpolate, nodeModulesPaths } from '@storybook/core-common';
import { createBabelLoader } from './babel-loader-preview';
import { useBaseTsSupport } from './useBaseTsSupport';
var storybookPaths = ['addons', 'api', 'channels', 'channel-postmessage', 'components', 'core-events', 'router', 'theming', 'semver', 'client-api', 'client-logger'].reduce(function (acc, sbPackage) {
  return _objectSpread(_objectSpread({}, acc), {}, {
    [`@storybook/${sbPackage}`]: path.dirname(require.resolve(`@storybook/${sbPackage}/package.json`))
  });
}, {});
export default (async function ({
  configDir: configDir,
  babelOptions: babelOptions,
  entries: entries,
  stories: stories,
  outputDir = path.join('.', 'public'),
  quiet: quiet,
  packageJson: packageJson,
  configType: configType,
  framework: framework,
  frameworkPath: frameworkPath,
  presets: presets,
  typescriptOptions: typescriptOptions,
  modern: modern,
  features: features
}) {
  var logLevel = await presets.apply('logLevel', undefined);
  var frameworkOptions = await presets.apply(`${framework}Options`, {});
  var headHtmlSnippet = await presets.apply('previewHead');
  var bodyHtmlSnippet = await presets.apply('previewBody');
  var template = await presets.apply('previewMainTemplate');
  var envs = await presets.apply('env');
  var babelLoader = createBabelLoader(babelOptions, framework);
  var isProd = configType === 'PRODUCTION'; // TODO FIX ME - does this need to be ESM?

  var entryTemplate = await fse.readFile(path.join(__dirname, 'virtualModuleEntry.template.js'), {
    encoding: 'utf8'
  });
  var storyTemplate = await fse.readFile(path.join(__dirname, 'virtualModuleStory.template.js'), {
    encoding: 'utf8'
  });
  var frameworkInitEntry = path.resolve(path.join(configDir, 'storybook-init-framework-entry.js')); // Allows for custom frameworks that are not published under the @storybook namespace

  var frameworkImportPath = frameworkPath || `@storybook/${framework}`;
  var virtualModuleMapping = {
    // Ensure that the client API is initialized by the framework before any other iframe code
    // is loaded. That way our client-apis can assume the existence of the API+store
    [frameworkInitEntry]: `import '${frameworkImportPath}';`
  };
  entries.forEach(function (entryFilename) {
    var match = entryFilename.match(/(.*)-generated-(config|other)-entry.js$/);

    if (match) {
      var configFilename = match[1];
      var clientApi = storybookPaths['@storybook/client-api'];
      var clientLogger = storybookPaths['@storybook/client-logger'];
      virtualModuleMapping[entryFilename] = interpolate(entryTemplate, {
        configFilename: configFilename,
        clientApi: clientApi,
        clientLogger: clientLogger
      });
    }
  });

  if (stories) {
    var storiesFilename = path.resolve(path.join(configDir, `generated-stories-entry.js`));
    virtualModuleMapping[storiesFilename] = interpolate(storyTemplate, {
      frameworkImportPath: frameworkImportPath
    }) // Make sure we also replace quotes for this one
    .replace("'{{stories}}'", stories.map(toRequireContextString).join(','));
  }

  var shouldCheckTs = useBaseTsSupport(framework) && typescriptOptions.check;
  var tsCheckOptions = typescriptOptions.checkOptions || {};
  return {
    name: 'preview',
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: 'cheap-module-source-map',
    entry: entries,
    // stats: 'errors-only',
    output: {
      path: path.resolve(process.cwd(), outputDir),
      filename: isProd ? '[name].[contenthash:8].iframe.bundle.js' : '[name].iframe.bundle.js',
      publicPath: ''
    },
    watchOptions: {
      ignored: /node_modules/
    },
    plugins: [new FilterWarningsPlugin({
      exclude: /export '\S+' was not found in 'global'/
    }), Object.keys(virtualModuleMapping).length > 0 ? new VirtualModulePlugin(virtualModuleMapping) : null, new HtmlWebpackPlugin({
      filename: `iframe.html`,
      // FIXME: `none` isn't a known option
      chunksSortMode: 'none',
      alwaysWriteToDisk: true,
      inject: false,
      templateParameters: function (compilation, files, options) {
        return {
          compilation: compilation,
          files: files,
          options: options,
          version: packageJson.version,
          globals: {
            LOGLEVEL: logLevel,
            FRAMEWORK_OPTIONS: frameworkOptions,
            FEATURES: features
          },
          headHtmlSnippet: headHtmlSnippet,
          bodyHtmlSnippet: bodyHtmlSnippet
        };
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      template: template
    }), new DefinePlugin({
      'process.env': stringifyEnvs(envs),
      NODE_ENV: JSON.stringify(envs.NODE_ENV)
    }), isProd ? null : new WatchMissingNodeModulesPlugin(nodeModulesPaths), isProd ? null : new HotModuleReplacementPlugin(), new CaseSensitivePathsPlugin(), quiet ? null : new ProgressPlugin({}), new Dotenv({
      silent: true
    }), shouldCheckTs ? new ForkTsCheckerWebpackPlugin(tsCheckOptions) : null].filter(Boolean),
    module: {
      rules: [babelLoader, es6Transpiler(), {
        test: /\.md$/,
        use: [{
          loader: require.resolve('raw-loader')
        }]
      }]
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.cjs'],
      modules: ['node_modules'].concat(envs.NODE_PATH || []),
      mainFields: [modern ? 'sbmodern' : null, 'browser', 'module', 'main'].filter(Boolean),
      alias: _objectSpread(_objectSpread(_objectSpread({}, themingPaths), storybookPaths), {}, {
        react: path.dirname(require.resolve('react/package.json')),
        'react-dom': path.dirname(require.resolve('react-dom/package.json'))
      }),
      plugins: [// Transparently resolve packages via PnP when needed; noop otherwise
      PnpWebpackPlugin]
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true,
      sideEffects: true,
      usedExports: true,
      minimizer: isProd ? [new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          sourceMap: true,
          mangle: false,
          keep_fnames: true
        }
      })] : []
    },
    performance: {
      hints: isProd ? 'warning' : false
    }
  };
});