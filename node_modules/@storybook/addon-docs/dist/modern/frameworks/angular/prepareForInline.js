import React from 'react';
import pLimit from 'p-limit';
import { rendererFactory } from '@storybook/angular/renderer';
const limit = pLimit(1);
/**
 * Uses the angular renderer to generate a story. Uses p-limit to run synchronously
 */

export const prepareForInline = (storyFn, {
  id,
  parameters
}) => {
  return /*#__PURE__*/React.createElement('div', {
    ref: async node => {
      if (!node) {
        return null;
      }

      return limit(async () => {
        const renderer = await rendererFactory.getRendererInstance(id, node);
        await renderer.render({
          forced: false,
          parameters,
          storyFnAngular: storyFn(),
          targetDOMNode: node
        });
      });
    }
  });
};