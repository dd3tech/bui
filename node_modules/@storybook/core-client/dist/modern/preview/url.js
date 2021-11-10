function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import global from 'global';
import qs from 'qs';
import deprecate from 'util-deprecate';
import { parseArgsParam } from './parseArgsParam';
const {
  history,
  document
} = global;
export function pathToId(path) {
  const match = (path || '').match(/^\/story\/(.+)/);

  if (!match) {
    throw new Error(`Invalid path '${path}',  must start with '/story/'`);
  }

  return match[1];
} // todo add proper types

export const setPath = selection => {
  if (!selection) {
    return;
  }

  const {
    storyId,
    viewMode
  } = selection;
  const {
    search = '',
    hash = ''
  } = document.location;

  const _qs$parse = qs.parse(search, {
    ignoreQueryPrefix: true
  }),
        rest = _objectWithoutPropertiesLoose(_qs$parse, ["path", "selectedKind", "selectedStory"]);

  const query = qs.stringify(Object.assign({}, rest, {
    id: storyId,
    viewMode
  }), {
    encode: false,
    addQueryPrefix: true
  });
  history.replaceState({}, '', `${document.location.pathname}${query}${hash}`);
};
export const parseQueryParameters = search => {
  const {
    id
  } = qs.parse(search, {
    ignoreQueryPrefix: true
  });
  return id;
};

const isObject = val => val != null && typeof val === 'object' && Array.isArray(val) === false;

const getFirstString = v => {
  if (typeof v === 'string') {
    return v;
  }

  if (Array.isArray(v)) {
    return getFirstString(v[0]);
  }

  if (isObject(v)) {
    // @ts-ignore
    return getFirstString(Object.values(v));
  }

  return undefined;
};

const deprecatedLegacyQuery = deprecate(() => 0, `URL formats with \`selectedKind\` and \`selectedName\` query parameters are deprecated.
Use \`id=$storyId\` instead.
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-url-structure`);
export const getSelectionSpecifierFromPath = () => {
  const query = qs.parse(document.location.search, {
    ignoreQueryPrefix: true
  });
  const args = typeof query.args === 'string' ? parseArgsParam(query.args) : undefined;
  const globals = typeof query.globals === 'string' ? parseArgsParam(query.globals) : undefined;
  let viewMode = getFirstString(query.viewMode);

  if (typeof viewMode !== 'string' || !viewMode.match(/docs|story/)) {
    viewMode = 'story';
  }

  const singleStory = getFirstString(query.singleStory) === 'true';
  const path = getFirstString(query.path);
  const storyId = path ? pathToId(path) : getFirstString(query.id);

  if (storyId) {
    return {
      storySpecifier: storyId,
      args,
      globals,
      viewMode,
      singleStory
    };
  } // Legacy URL format


  const kind = getFirstString(query.selectedKind);
  const name = getFirstString(query.selectedStory);

  if (kind && name) {
    deprecatedLegacyQuery();
    return {
      storySpecifier: {
        kind,
        name
      },
      args,
      globals,
      viewMode,
      singleStory
    };
  }

  return null;
};