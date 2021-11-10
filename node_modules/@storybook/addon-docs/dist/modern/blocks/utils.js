/* eslint-disable no-underscore-dangle */
export const getDocsStories = context => {
  const {
    storyStore,
    kind
  } = context;

  if (!storyStore) {
    return [];
  }

  return storyStore.getStoriesForKind(kind).filter(s => !(s.parameters && s.parameters.docs && s.parameters.docs.disable));
};

const titleCase = str => str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');

export const getComponentName = component => {
  if (!component) {
    return undefined;
  }

  if (typeof component === 'string') {
    if (component.includes('-')) {
      return titleCase(component);
    }

    return component;
  }

  if (component.__docgenInfo && component.__docgenInfo.displayName) {
    return component.__docgenInfo.displayName;
  }

  return component.name;
};
export function scrollToElement(element, block = 'start') {
  element.scrollIntoView({
    behavior: 'smooth',
    block,
    inline: 'nearest'
  });
}