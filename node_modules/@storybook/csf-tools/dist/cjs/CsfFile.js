"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeCsf = exports.readCsf = exports.formatCsf = exports.loadCsf = exports.CsfFile = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.regexp.flags.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.object.to-string.js");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _parser = require("@babel/parser");

var _generator = _interopRequireDefault(require("@babel/generator"));

var t = _interopRequireWildcard(require("@babel/types"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var _csf = require("@storybook/csf");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logger = console;

function parseIncludeExclude(prop) {
  if (t.isArrayExpression(prop)) {
    return prop.elements.map(function (e) {
      if (t.isStringLiteral(e)) return e.value;
      throw new Error("Expected string literal: ".concat(e));
    });
  }

  if (t.isStringLiteral(prop)) return new RegExp(prop.value);
  if (t.isRegExpLiteral(prop)) return new RegExp(prop.pattern, prop.flags);
  throw new Error("Unknown include/exclude: ".concat(prop));
}

var parseTitle = function parseTitle(value) {
  if (t.isStringLiteral(value)) return value.value;
  logger.warn("Unexpected meta.title: ".concat(JSON.stringify(value)));
  return undefined;
};

var findVarInitialization = function findVarInitialization(identifier, program) {
  var init = null;
  var declarations = null;
  program.body.find(function (node) {
    if (t.isVariableDeclaration(node)) {
      declarations = node.declarations;
    } else if (t.isExportNamedDeclaration(node) && t.isVariableDeclaration(node.declaration)) {
      declarations = node.declaration.declarations;
    }

    return declarations && declarations.find(function (decl) {
      if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id) && decl.id.name === identifier) {
        init = decl.init;
        return true; // stop looking
      }

      return false;
    });
  });
  return init;
};

var isArgsStory = function isArgsStory(_ref, parent, csf) {
  var init = _ref.init;
  var storyFn = init; // export const Foo = Bar.bind({})

  if (t.isCallExpression(init)) {
    var callee = init.callee,
        bindArguments = init.arguments;

    if (t.isProgram(parent) && t.isMemberExpression(callee) && t.isIdentifier(callee.object) && t.isIdentifier(callee.property) && callee.property.name === 'bind' && (bindArguments.length === 0 || bindArguments.length === 1 && t.isObjectExpression(bindArguments[0]) && bindArguments[0].properties.length === 0)) {
      var boundIdentifier = callee.object.name;
      var template = findVarInitialization(boundIdentifier, parent);

      if (template) {
        // eslint-disable-next-line no-param-reassign
        csf._templates[boundIdentifier] = template;
        storyFn = template;
      }
    }
  }

  if (t.isArrowFunctionExpression(storyFn)) {
    return storyFn.params.length > 0;
  }

  return false;
};

var CsfFile = /*#__PURE__*/function () {
  function CsfFile(ast) {
    _classCallCheck(this, CsfFile);

    this._ast = void 0;
    this._meta = void 0;
    this._stories = {};
    this._metaAnnotations = {};
    this._storyExports = {};
    this._storyAnnotations = {};
    this._templates = {};
    this._ast = ast;
  }

  _createClass(CsfFile, [{
    key: "_parseMeta",
    value: function _parseMeta(declaration) {
      var _this = this;

      var meta = {};
      declaration.properties.forEach(function (p) {
        if (t.isIdentifier(p.key)) {
          _this._metaAnnotations[p.key.name] = p.value;

          if (p.key.name === 'title') {
            meta.title = parseTitle(p.value);
          } else if (['includeStories', 'excludeStories'].includes(p.key.name)) {
            // @ts-ignore
            meta[p.key.name] = parseIncludeExclude(p.value);
          } else if (p.key.name === 'component') {
            if (t.isIdentifier(p.value)) {
              meta.component = p.value.name;
            } else if (t.isStringLiteral(p.value)) {
              meta.component = p.value.value;
            }
          }
        }
      });
      this._meta = meta;
    }
  }, {
    key: "parse",
    value: function parse() {
      var _self$_meta, _self$_meta2;

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var self = this;
      (0, _traverse.default)(this._ast, {
        ExportDefaultDeclaration: {
          enter: function enter(_ref2) {
            var node = _ref2.node,
                parent = _ref2.parent;
            var metaNode;

            if (t.isObjectExpression(node.declaration)) {
              // export default { ... };
              metaNode = node.declaration;
            } else if ( // export default { ... } as Meta<...>
            t.isTSAsExpression(node.declaration) && t.isObjectExpression(node.declaration.expression)) {
              metaNode = node.declaration.expression;
            } else if (t.isIdentifier(node.declaration) && t.isProgram(parent)) {
              var init = findVarInitialization(node.declaration.name, parent);

              if (t.isObjectExpression(init)) {
                metaNode = init;
              }
            }

            if (!self._meta && metaNode) {
              self._parseMeta(metaNode);
            }
          }
        },
        ExportNamedDeclaration: {
          enter: function enter(_ref3) {
            var node = _ref3.node,
                parent = _ref3.parent;

            if (t.isVariableDeclaration(node.declaration)) {
              // export const X = ...;
              node.declaration.declarations.forEach(function (decl) {
                if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id)) {
                  var name = decl.id.name;
                  var parameters = {
                    // __id: toId(self._meta.title, name),
                    // FIXME: Template.bind({});
                    __isArgsStory: isArgsStory(decl, parent, self)
                  };
                  self._stories[name] = {
                    id: 'FIXME',
                    name: name,
                    parameters: parameters
                  };
                  self._storyExports[name] = decl;

                  if (self._storyAnnotations[name]) {
                    logger.warn("Unexpected annotations for \"".concat(name, "\" before story declaration"));
                  } else {
                    self._storyAnnotations[name] = {};
                  }
                }
              });
            }
          }
        },
        ExpressionStatement: {
          enter: function enter(_ref4) {
            var node = _ref4.node,
                parent = _ref4.parent;
            var expression = node.expression; // B.storyName = 'some string';

            if (t.isProgram(parent) && t.isAssignmentExpression(expression) && t.isMemberExpression(expression.left) && t.isIdentifier(expression.left.object) && t.isIdentifier(expression.left.property)) {
              var exportName = expression.left.object.name;
              var annotationKey = expression.left.property.name;
              var annotationValue = expression.right; // v1-style annotation
              // A.story = { parameters: ..., decorators: ... }

              if (self._storyAnnotations[exportName]) {
                if (annotationKey === 'story' && t.isObjectExpression(annotationValue)) {
                  annotationValue.properties.forEach(function (prop) {
                    if (t.isIdentifier(prop.key)) {
                      self._storyAnnotations[exportName][prop.key.name] = prop.value;
                    }
                  });
                } else {
                  self._storyAnnotations[exportName][annotationKey] = annotationValue;
                }
              } else {
                logger.debug("skipping \"".concat(exportName, ".").concat(annotationKey, "\""));
              }

              if (annotationKey === 'storyName' && t.isStringLiteral(annotationValue)) {
                var storyName = annotationValue.value;
                var story = self._stories[exportName];
                if (!story) return;
                story.name = storyName;
              }
            }
          }
        }
      }); // default export can come at any point in the file, so we do this post processing last

      if ((_self$_meta = self._meta) !== null && _self$_meta !== void 0 && _self$_meta.title || (_self$_meta2 = self._meta) !== null && _self$_meta2 !== void 0 && _self$_meta2.component) {
        self._stories = Object.entries(self._stories).reduce(function (acc, _ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              key = _ref6[0],
              story = _ref6[1];

          if ((0, _csf.isExportStory)(key, self._meta)) {
            var id = (0, _csf.toId)(self._meta.title, (0, _csf.storyNameFromExport)(key));
            acc[key] = Object.assign({}, story, {
              id: id,
              parameters: Object.assign({}, story.parameters, {
                __id: id
              })
            });
          }

          return acc;
        }, {});
        Object.keys(self._storyExports).forEach(function (key) {
          if (!(0, _csf.isExportStory)(key, self._meta)) {
            delete self._storyExports[key];
            delete self._storyAnnotations[key];
          }
        });
      } else {
        // no meta = no stories
        self._stories = {};
        self._storyExports = {};
        self._storyAnnotations = {};
      }

      return self;
    }
  }, {
    key: "meta",
    get: function get() {
      return this._meta;
    }
  }, {
    key: "stories",
    get: function get() {
      return Object.values(this._stories);
    }
  }]);

  return CsfFile;
}();

exports.CsfFile = CsfFile;

var loadCsf = function loadCsf(code) {
  var ast = (0, _parser.parse)(code, {
    sourceType: 'module',
    // FIXME: we should get this from the project config somehow?
    plugins: ['jsx', 'typescript', ['decorators', {
      decoratorsBeforeExport: true
    }], 'classProperties']
  });
  return new CsfFile(ast);
};

exports.loadCsf = loadCsf;

var formatCsf = function formatCsf(csf) {
  var _generate = (0, _generator.default)(csf._ast, {}),
      code = _generate.code;

  return code;
};

exports.formatCsf = formatCsf;

var readCsf = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileName) {
    var code;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _fsExtra.default.readFile(fileName, 'utf-8');

          case 2:
            code = _context.sent.toString();
            return _context.abrupt("return", loadCsf(code));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readCsf(_x) {
    return _ref7.apply(this, arguments);
  };
}();

exports.readCsf = readCsf;

var writeCsf = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fileName, csf) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _fsExtra.default;
            _context2.t1 = fileName;
            _context2.next = 4;
            return formatCsf(csf);

          case 4:
            _context2.t2 = _context2.sent;
            _context2.next = 7;
            return _context2.t0.writeFile.call(_context2.t0, _context2.t1, _context2.t2);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function writeCsf(_x2, _x3) {
    return _ref8.apply(this, arguments);
  };
}();

exports.writeCsf = writeCsf;