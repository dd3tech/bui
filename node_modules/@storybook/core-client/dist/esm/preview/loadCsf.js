import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.symbol.js";

var _templateObject, _templateObject2;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.set.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.function.name.js";

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { isExportStory } from '@storybook/csf';
import { logger } from '@storybook/client-logger';
import dedent from 'ts-dedent';
import deprecate from 'util-deprecate';
import { normalizeStory } from './normalizeStory';
var duplicateKindWarning = deprecate(function (kindName) {
  logger.warn("Duplicate title: '".concat(kindName, "'"));
}, dedent(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    Duplicate title used in multiple files; use unique titles or a primary file for a component with re-exported stories.\n\n    https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-support-for-duplicate-kinds\n  "]))));
var previousExports = new Map();

var loadStories = function loadStories(loadable, framework, _ref) {
  var clientApi = _ref.clientApi,
      storyStore = _ref.storyStore;
  return function () {
    // Make sure we don't try to define a kind more than once within the same load
    var loadedKinds = new Set();
    var reqs = null; // todo discuss / improve type check

    if (Array.isArray(loadable)) {
      reqs = loadable;
    } else if (loadable.keys) {
      reqs = [loadable];
    }

    var currentExports = new Map();

    if (reqs) {
      reqs.forEach(function (req) {
        req.keys().forEach(function (filename) {
          try {
            var fileExports = req(filename);
            currentExports.set(fileExports, // todo discuss: types infer that this is RequireContext; no checks needed?
            // NOTE: turns out `babel-plugin-require-context-hook` doesn't implement this (yet)
            typeof req.resolve === 'function' ? req.resolve(filename) : filename);
          } catch (error) {
            logger.warn("Unexpected error while loading ".concat(filename, ": ").concat(error));
          }
        });
      });
    } else {
      var exported = loadable();

      if (Array.isArray(exported) && exported.every(function (obj) {
        return obj.default != null;
      })) {
        currentExports = new Map(exported.map(function (fileExports) {
          return [fileExports, null];
        }));
      } else if (exported) {
        logger.warn("Loader function passed to 'configure' should return void or an array of module exports that all contain a 'default' export. Received: ".concat(JSON.stringify(exported)));
      }
    }

    var removed = Array.from(previousExports.keys()).filter(function (exp) {
      return !currentExports.has(exp);
    });
    removed.forEach(function (exp) {
      if (exp.default) {
        storyStore.removeStoryKind(exp.default.title);
      }
    });
    var added = Array.from(currentExports.keys()).filter(function (exp) {
      return !previousExports.has(exp);
    });
    added.forEach(function (fileExports) {
      // An old-style story file
      if (!fileExports.default) {
        return;
      }

      if (!fileExports.default.title) {
        throw new Error("Unexpected default export without title: ".concat(JSON.stringify(fileExports.default)));
      }

      var meta = fileExports.default,
          __namedExportsOrder = fileExports.__namedExportsOrder,
          namedExports = _objectWithoutProperties(fileExports, ["default", "__namedExportsOrder"]);

      var exports = namedExports; // prefer a user/loader provided `__namedExportsOrder` array if supplied
      // we do this as es module exports are always ordered alphabetically
      // see https://github.com/storybookjs/storybook/issues/9136

      if (Array.isArray(__namedExportsOrder)) {
        exports = {};

        __namedExportsOrder.forEach(function (name) {
          if (namedExports[name]) {
            exports[name] = namedExports[name];
          }
        });
      }

      var kindName = meta.title,
          kindParameters = meta.parameters,
          kindDecorators = meta.decorators,
          _meta$loaders = meta.loaders,
          kindLoaders = _meta$loaders === void 0 ? [] : _meta$loaders,
          component = meta.component,
          subcomponents = meta.subcomponents,
          kindArgs = meta.args,
          kindArgTypes = meta.argTypes;

      if (loadedKinds.has(kindName)) {
        duplicateKindWarning(kindName);
      }

      loadedKinds.add(kindName); // We pass true here to avoid the warning about HMR. It's cool clientApi, we got this
      // todo discuss: TS now wants a NodeModule; should we fix this differently?

      var kind = clientApi.storiesOf(kindName, true); // we should always have a framework, rest optional

      kind.addParameters(Object.assign({
        framework: framework,
        component: component,
        subcomponents: subcomponents,
        fileName: currentExports.get(fileExports)
      }, kindParameters, {
        args: kindArgs,
        argTypes: kindArgTypes
      })); // todo add type

      (kindDecorators || []).forEach(function (decorator) {
        kind.addDecorator(decorator);
      });
      kindLoaders.forEach(function (loader) {
        kind.addLoader(loader);
      });
      var storyExports = Object.keys(exports);

      if (storyExports.length === 0) {
        logger.warn(dedent(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          Found a story file for \"", "\" but no exported stories.\n          Check the docs for reference: https://storybook.js.org/docs/formats/component-story-format/\n        "])), kindName));
        return;
      }

      storyExports.forEach(function (key) {
        if (isExportStory(key, meta)) {
          var _normalizeStory = normalizeStory(key, exports[key], meta, clientApi.globalRender),
              name = _normalizeStory.name,
              storyFn = _normalizeStory.storyFn,
              parameters = _normalizeStory.parameters;

          kind.add(name, storyFn, parameters);
        }
      });
    });
    previousExports = currentExports;
  };
};

var configureDeprecationWarning = deprecate(function () {}, "`configure()` is deprecated and will be removed in Storybook 7.0. \nPlease use the `stories` field of `main.js` to load stories.\nRead more at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-configure");
var loaded = false;
export var loadCsf = function loadCsf(_ref2) {
  var clientApi = _ref2.clientApi,
      storyStore = _ref2.storyStore,
      configApi = _ref2.configApi;
  return (
    /**
     * Load a collection of stories. If it has a default export, assume that it is a module-style
     * file and process its named exports as stories. If not, assume it's an old-style
     * storiesof file and require it.
     *
     * @param {*} framework - name of framework in use, e.g. "react"
     * @param {*} loadable a require.context `req`, an array of `req`s, or a loader function that returns void or an array of exports
     * @param {*} m - ES module object for hot-module-reloading (HMR)
     * @param {boolean} showDeprecationWarning - show the deprecation warning (default true)
     */
    function (framework, loadable, m) {
      var showDeprecationWarning = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (showDeprecationWarning) {
        configureDeprecationWarning();
      }

      if (typeof m === 'string') {
        throw new Error("Invalid module '".concat(m, "'. Did you forget to pass `module` as the second argument to `configure`\"?"));
      }

      if (m && m.hot && m.hot.dispose) {
        var _ref3 = m.hot.data || {};

        var _ref3$previousExports = _ref3.previousExports;
        previousExports = _ref3$previousExports === void 0 ? new Map() : _ref3$previousExports;
        m.hot.dispose(function (data) {
          loaded = false; // eslint-disable-next-line no-param-reassign

          data.previousExports = previousExports;
        });
        m.hot.accept();
      }

      if (loaded) {
        logger.warn('Unexpected loaded state. Did you call `load` twice?');
      }

      loaded = true;
      configApi.configure(loadStories(loadable, framework, {
        clientApi: clientApi,
        storyStore: storyStore
      }), m);
    }
  );
};