import "core-js/modules/es.array.reduce.js";

/* eslint-disable no-underscore-dangle */
import fs from 'fs-extra';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import { toId, isExportStory, storyNameFromExport } from '@storybook/csf';
const logger = console;

function parseIncludeExclude(prop) {
  if (t.isArrayExpression(prop)) {
    return prop.elements.map(e => {
      if (t.isStringLiteral(e)) return e.value;
      throw new Error(`Expected string literal: ${e}`);
    });
  }

  if (t.isStringLiteral(prop)) return new RegExp(prop.value);
  if (t.isRegExpLiteral(prop)) return new RegExp(prop.pattern, prop.flags);
  throw new Error(`Unknown include/exclude: ${prop}`);
}

const parseTitle = value => {
  if (t.isStringLiteral(value)) return value.value;
  logger.warn(`Unexpected meta.title: ${JSON.stringify(value)}`);
  return undefined;
};

const findVarInitialization = (identifier, program) => {
  let init = null;
  let declarations = null;
  program.body.find(node => {
    if (t.isVariableDeclaration(node)) {
      declarations = node.declarations;
    } else if (t.isExportNamedDeclaration(node) && t.isVariableDeclaration(node.declaration)) {
      declarations = node.declaration.declarations;
    }

    return declarations && declarations.find(decl => {
      if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id) && decl.id.name === identifier) {
        init = decl.init;
        return true; // stop looking
      }

      return false;
    });
  });
  return init;
};

const isArgsStory = ({
  init
}, parent, csf) => {
  let storyFn = init; // export const Foo = Bar.bind({})

  if (t.isCallExpression(init)) {
    const {
      callee,
      arguments: bindArguments
    } = init;

    if (t.isProgram(parent) && t.isMemberExpression(callee) && t.isIdentifier(callee.object) && t.isIdentifier(callee.property) && callee.property.name === 'bind' && (bindArguments.length === 0 || bindArguments.length === 1 && t.isObjectExpression(bindArguments[0]) && bindArguments[0].properties.length === 0)) {
      const boundIdentifier = callee.object.name;
      const template = findVarInitialization(boundIdentifier, parent);

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

export class CsfFile {
  constructor(ast) {
    this._ast = void 0;
    this._meta = void 0;
    this._stories = {};
    this._metaAnnotations = {};
    this._storyExports = {};
    this._storyAnnotations = {};
    this._templates = {};
    this._ast = ast;
  }

  _parseMeta(declaration) {
    const meta = {};
    declaration.properties.forEach(p => {
      if (t.isIdentifier(p.key)) {
        this._metaAnnotations[p.key.name] = p.value;

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

  parse() {
    var _self$_meta, _self$_meta2;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    traverse(this._ast, {
      ExportDefaultDeclaration: {
        enter({
          node,
          parent
        }) {
          let metaNode;

          if (t.isObjectExpression(node.declaration)) {
            // export default { ... };
            metaNode = node.declaration;
          } else if ( // export default { ... } as Meta<...>
          t.isTSAsExpression(node.declaration) && t.isObjectExpression(node.declaration.expression)) {
            metaNode = node.declaration.expression;
          } else if (t.isIdentifier(node.declaration) && t.isProgram(parent)) {
            const init = findVarInitialization(node.declaration.name, parent);

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
        enter({
          node,
          parent
        }) {
          if (t.isVariableDeclaration(node.declaration)) {
            // export const X = ...;
            node.declaration.declarations.forEach(decl => {
              if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id)) {
                const {
                  name
                } = decl.id;
                const parameters = {
                  // __id: toId(self._meta.title, name),
                  // FIXME: Template.bind({});
                  __isArgsStory: isArgsStory(decl, parent, self)
                };
                self._stories[name] = {
                  id: 'FIXME',
                  name,
                  parameters
                };
                self._storyExports[name] = decl;

                if (self._storyAnnotations[name]) {
                  logger.warn(`Unexpected annotations for "${name}" before story declaration`);
                } else {
                  self._storyAnnotations[name] = {};
                }
              }
            });
          }
        }

      },
      ExpressionStatement: {
        enter({
          node,
          parent
        }) {
          const {
            expression
          } = node; // B.storyName = 'some string';

          if (t.isProgram(parent) && t.isAssignmentExpression(expression) && t.isMemberExpression(expression.left) && t.isIdentifier(expression.left.object) && t.isIdentifier(expression.left.property)) {
            const exportName = expression.left.object.name;
            const annotationKey = expression.left.property.name;
            const annotationValue = expression.right; // v1-style annotation
            // A.story = { parameters: ..., decorators: ... }

            if (self._storyAnnotations[exportName]) {
              if (annotationKey === 'story' && t.isObjectExpression(annotationValue)) {
                annotationValue.properties.forEach(prop => {
                  if (t.isIdentifier(prop.key)) {
                    self._storyAnnotations[exportName][prop.key.name] = prop.value;
                  }
                });
              } else {
                self._storyAnnotations[exportName][annotationKey] = annotationValue;
              }
            } else {
              logger.debug(`skipping "${exportName}.${annotationKey}"`);
            }

            if (annotationKey === 'storyName' && t.isStringLiteral(annotationValue)) {
              const storyName = annotationValue.value;
              const story = self._stories[exportName];
              if (!story) return;
              story.name = storyName;
            }
          }
        }

      }
    }); // default export can come at any point in the file, so we do this post processing last

    if ((_self$_meta = self._meta) !== null && _self$_meta !== void 0 && _self$_meta.title || (_self$_meta2 = self._meta) !== null && _self$_meta2 !== void 0 && _self$_meta2.component) {
      self._stories = Object.entries(self._stories).reduce((acc, [key, story]) => {
        if (isExportStory(key, self._meta)) {
          const id = toId(self._meta.title, storyNameFromExport(key));
          acc[key] = Object.assign({}, story, {
            id,
            parameters: Object.assign({}, story.parameters, {
              __id: id
            })
          });
        }

        return acc;
      }, {});
      Object.keys(self._storyExports).forEach(key => {
        if (!isExportStory(key, self._meta)) {
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

  get meta() {
    return this._meta;
  }

  get stories() {
    return Object.values(this._stories);
  }

}
export const loadCsf = code => {
  const ast = parse(code, {
    sourceType: 'module',
    // FIXME: we should get this from the project config somehow?
    plugins: ['jsx', 'typescript', ['decorators', {
      decoratorsBeforeExport: true
    }], 'classProperties']
  });
  return new CsfFile(ast);
};
export const formatCsf = csf => {
  const {
    code
  } = generate(csf._ast, {});
  return code;
};
export const readCsf = async fileName => {
  const code = (await fs.readFile(fileName, 'utf-8')).toString();
  return loadCsf(code);
};
export const writeCsf = async (fileName, csf) => {
  await fs.writeFile(fileName, await formatCsf(csf));
};