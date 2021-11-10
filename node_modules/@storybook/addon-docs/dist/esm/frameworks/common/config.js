import { DocsContainer, DocsPage } from '../../blocks';
import { enhanceArgTypes } from './enhanceArgTypes';
export var parameters = {
  docs: {
    inlineStories: false,
    container: DocsContainer,
    page: DocsPage,
    iframeHeight: 100
  }
};
export var argTypesEnhancers = [enhanceArgTypes];