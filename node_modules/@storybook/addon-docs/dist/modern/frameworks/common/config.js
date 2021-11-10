import { DocsContainer, DocsPage } from '../../blocks';
import { enhanceArgTypes } from './enhanceArgTypes';
export const parameters = {
  docs: {
    inlineStories: false,
    container: DocsContainer,
    page: DocsPage,
    iframeHeight: 100
  }
};
export const argTypesEnhancers = [enhanceArgTypes];