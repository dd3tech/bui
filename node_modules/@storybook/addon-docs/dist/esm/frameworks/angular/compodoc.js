function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

/* eslint-disable no-underscore-dangle */

/* global window */
import { logger } from '@storybook/client-logger';
export var isMethod = function isMethod(methodOrProp) {
  return methodOrProp.args !== undefined;
};
export var setCompodocJson = function setCompodocJson(compodocJson) {
  // @ts-ignore
  window.__STORYBOOK_COMPODOC_JSON__ = compodocJson;
}; // @ts-ignore

export var getCompodocJson = function getCompodocJson() {
  return window.__STORYBOOK_COMPODOC_JSON__;
};
export var checkValidComponentOrDirective = function checkValidComponentOrDirective(component) {
  if (!component.name) {
    throw new Error("Invalid component ".concat(JSON.stringify(component)));
  }
};
export var checkValidCompodocJson = function checkValidCompodocJson(compodocJson) {
  if (!compodocJson || !compodocJson.components) {
    throw new Error('Invalid compodoc JSON');
  }
};

var hasDecorator = function hasDecorator(item, decoratorName) {
  return item.decorators && item.decorators.find(function (x) {
    return x.name === decoratorName;
  });
};

var mapPropertyToSection = function mapPropertyToSection(key, item) {
  if (hasDecorator(item, 'ViewChild')) {
    return 'view child';
  }

  if (hasDecorator(item, 'ViewChildren')) {
    return 'view children';
  }

  if (hasDecorator(item, 'ContentChild')) {
    return 'content child';
  }

  if (hasDecorator(item, 'ContentChildren')) {
    return 'content children';
  }

  return 'properties';
};

var mapItemToSection = function mapItemToSection(key, item) {
  switch (key) {
    case 'methods':
    case 'methodsClass':
      return 'methods';

    case 'inputsClass':
      return 'inputs';

    case 'outputsClass':
      return 'outputs';

    case 'properties':
    case 'propertiesClass':
      if (isMethod(item)) {
        throw new Error("Cannot be of type Method if key === 'propertiesClass'");
      }

      return mapPropertyToSection(key, item);

    default:
      throw new Error("Unknown key: ".concat(key));
  }
};

export var findComponentByName = function findComponentByName(name, compodocJson) {
  return compodocJson.components.find(function (c) {
    return c.name === name;
  }) || compodocJson.directives.find(function (c) {
    return c.name === name;
  }) || compodocJson.pipes.find(function (c) {
    return c.name === name;
  }) || compodocJson.injectables.find(function (c) {
    return c.name === name;
  }) || compodocJson.classes.find(function (c) {
    return c.name === name;
  });
};

var getComponentData = function getComponentData(component) {
  if (!component) {
    return null;
  }

  checkValidComponentOrDirective(component);
  var compodocJson = getCompodocJson();

  if (!compodocJson) {
    return null;
  }

  checkValidCompodocJson(compodocJson);
  var name = component.name;
  var metadata = findComponentByName(name, compodocJson);

  if (!metadata) {
    logger.warn("Component not found in compodoc JSON: '".concat(name, "'"));
  }

  return metadata;
};

var displaySignature = function displaySignature(item) {
  var args = item.args.map(function (arg) {
    return "".concat(arg.name).concat(arg.optional ? '?' : '', ": ").concat(arg.type);
  });
  return "(".concat(args.join(', '), ") => ").concat(item.returnType);
};

var extractTypeFromValue = function extractTypeFromValue(defaultValue) {
  var valueType = _typeof(defaultValue);

  return defaultValue || valueType === 'number' || valueType === 'boolean' || valueType === 'string' ? valueType : null;
};

var extractEnumValues = function extractEnumValues(compodocType) {
  var compodocJson = getCompodocJson();
  var enumType = compodocJson === null || compodocJson === void 0 ? void 0 : compodocJson.miscellaneous.enumerations.find(function (x) {
    return x.name === compodocType;
  });

  if (enumType !== null && enumType !== void 0 && enumType.childs.every(function (x) {
    return x.value;
  })) {
    return enumType.childs.map(function (x) {
      return x.value;
    });
  }

  if (typeof compodocType !== 'string' || compodocType.indexOf('|') === -1) {
    return null;
  }

  try {
    return compodocType.split('|').map(function (value) {
      return JSON.parse(value);
    });
  } catch (e) {
    return null;
  }
};

export var extractType = function extractType(property, defaultValue) {
  var compodocType = property.type || extractTypeFromValue(defaultValue);

  switch (compodocType) {
    case 'string':
    case 'boolean':
    case 'number':
      return {
        name: compodocType
      };

    case undefined:
    case null:
      return {
        name: 'void'
      };

    default:
      {
        var resolvedType = resolveTypealias(compodocType);
        var enumValues = extractEnumValues(resolvedType);
        return enumValues ? {
          name: 'enum',
          value: enumValues
        } : {
          name: 'object'
        };
      }
  }
};

var extractDefaultValue = function extractDefaultValue(property) {
  try {
    // eslint-disable-next-line no-eval
    var value = eval(property.defaultValue);
    return value;
  } catch (err) {
    logger.debug("Error extracting ".concat(property.name, ": ").concat(property.defaultValue));
    return undefined;
  }
};

var resolveTypealias = function resolveTypealias(compodocType) {
  var compodocJson = getCompodocJson();
  var typeAlias = compodocJson === null || compodocJson === void 0 ? void 0 : compodocJson.miscellaneous.typealiases.find(function (x) {
    return x.name === compodocType;
  });
  return typeAlias ? resolveTypealias(typeAlias.rawtype) : compodocType;
};

export var extractArgTypesFromData = function extractArgTypesFromData(componentData) {
  var sectionToItems = {};
  var compodocClasses = ['component', 'directive'].includes(componentData.type) ? ['propertiesClass', 'methodsClass', 'inputsClass', 'outputsClass'] : ['properties', 'methods'];
  compodocClasses.forEach(function (key) {
    var data = componentData[key] || [];
    data.forEach(function (item) {
      var section = mapItemToSection(key, item);
      var defaultValue = isMethod(item) ? undefined : extractDefaultValue(item);
      var type = isMethod(item) || section !== 'inputs' ? {
        name: 'void'
      } : extractType(item, defaultValue);
      var action = section === 'outputs' ? {
        action: item.name
      } : {};
      var argType = Object.assign({
        name: item.name,
        description: item.description,
        defaultValue: defaultValue,
        type: type
      }, action, {
        table: {
          category: section,
          type: {
            summary: isMethod(item) ? displaySignature(item) : item.type,
            required: isMethod(item) ? false : !item.optional
          }
        }
      });

      if (!sectionToItems[section]) {
        sectionToItems[section] = [];
      }

      sectionToItems[section].push(argType);
    });
  });
  var SECTIONS = ['inputs', 'outputs', 'properties', 'methods', 'view child', 'view children', 'content child', 'content children'];
  var argTypes = {};
  SECTIONS.forEach(function (section) {
    var items = sectionToItems[section];

    if (items) {
      items.forEach(function (argType) {
        argTypes[argType.name] = argType;
      });
    }
  });
  return argTypes;
};
export var extractArgTypes = function extractArgTypes(component) {
  var componentData = getComponentData(component);
  return componentData && extractArgTypesFromData(componentData);
};
export var extractComponentDescription = function extractComponentDescription(component) {
  var componentData = getComponentData(component);
  return componentData && (componentData.rawdescription || componentData.description);
};