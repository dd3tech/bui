import "core-js/modules/es.array.reduce.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.assign.js";
import { getCustomElements, isValidComponent, isValidMetaData } from '@storybook/web-components';
import { logger } from '@storybook/client-logger';

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
  if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
    return null;
  }

  var metaData = customElements.tags.find(function (tag) {
    return tag.name.toUpperCase() === tagName.toUpperCase();
  });

  if (!metaData) {
    logger.warn("Component not found in custom-elements.json: ".concat(tagName));
  }

  return metaData;
};

export var extractArgTypesFromElements = function extractArgTypesFromElements(tagName, customElements) {
  var metaData = getMetaData(tagName, customElements);
  return metaData && Object.assign({}, mapData(metaData.attributes, 'attributes'), mapData(metaData.properties, 'properties'), mapData(metaData.events, 'events'), mapData(metaData.methods, 'methods'), mapData(metaData.slots, 'slots'), mapData(metaData.cssProperties, 'css custom properties'), mapData(metaData.cssParts, 'css shadow parts'));
};
export var extractArgTypes = function extractArgTypes(tagName) {
  return extractArgTypesFromElements(tagName, getCustomElements());
};
export var extractComponentDescription = function extractComponentDescription(tagName) {
  var metaData = getMetaData(tagName, getCustomElements());
  return metaData && metaData.description;
};