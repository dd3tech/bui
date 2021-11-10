"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractComponentDescription = exports.extractArgTypes = exports.extractArgTypesFromElements = void 0;

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.assign.js");

var _webComponents = require("@storybook/web-components");

var _clientLogger = require("@storybook/client-logger");

function mapData(data, category) {
  return data && data.reduce(function (acc, item) {
    var type = category === 'properties' ? {
      name: item.type
    } : {
      name: 'void'
    };
    acc[item.name] = {
      name: item.name,
      required: false,
      description: item.description,
      type: type,
      table: {
        category: category,
        type: {
          summary: item.type
        },
        defaultValue: {
          summary: item.default !== undefined ? item.default : item.defaultValue
        }
      }
    };
    return acc;
  }, {});
}

var getMetaData = function getMetaData(tagName, customElements) {
  if (!(0, _webComponents.isValidComponent)(tagName) || !(0, _webComponents.isValidMetaData)(customElements)) {
    return null;
  }

  var metaData = customElements.tags.find(function (tag) {
    return tag.name.toUpperCase() === tagName.toUpperCase();
  });

  if (!metaData) {
    _clientLogger.logger.warn("Component not found in custom-elements.json: ".concat(tagName));
  }

  return metaData;
};

var extractArgTypesFromElements = function extractArgTypesFromElements(tagName, customElements) {
  var metaData = getMetaData(tagName, customElements);
  return metaData && Object.assign({}, mapData(metaData.attributes, 'attributes'), mapData(metaData.properties, 'properties'), mapData(metaData.events, 'events'), mapData(metaData.methods, 'methods'), mapData(metaData.slots, 'slots'), mapData(metaData.cssProperties, 'css custom properties'), mapData(metaData.cssParts, 'css shadow parts'));
};

exports.extractArgTypesFromElements = extractArgTypesFromElements;

var extractArgTypes = function extractArgTypes(tagName) {
  return extractArgTypesFromElements(tagName, (0, _webComponents.getCustomElements)());
};

exports.extractArgTypes = extractArgTypes;

var extractComponentDescription = function extractComponentDescription(tagName) {
  var metaData = getMetaData(tagName, (0, _webComponents.getCustomElements)());
  return metaData && metaData.description;
};

exports.extractComponentDescription = extractComponentDescription;