import "core-js/modules/es.array.reduce.js";
import React, { Fragment, useMemo, useEffect, useState } from 'react';
import { Global } from '@storybook/theming';
import { IFrame } from './iframe';
import { stringifyQueryParams } from './utils/stringifyQueryParams';

const getActive = refId => {
  if (refId) {
    return `storybook-ref-${refId}`;
  }

  return 'storybook-preview-iframe';
};

export const FramesRenderer = ({
  refs,
  story,
  scale,
  viewMode = 'story',
  refId,
  queryParams = {},
  baseUrl,
  storyId = '*'
}) => {
  var _refs$refId;

  const version = (_refs$refId = refs[refId]) === null || _refs$refId === void 0 ? void 0 : _refs$refId.version;
  const stringifiedQueryParams = stringifyQueryParams(Object.assign({}, queryParams, version && {
    version
  }));
  const active = getActive(refId);
  const styles = useMemo(() => {
    return {
      '[data-is-storybook="false"]': {
        visibility: 'hidden'
      },
      '[data-is-storybook="true"]': {
        visibility: 'visible'
      }
    };
  }, []);
  const [frames, setFrames] = useState({
    'storybook-preview-iframe': `${baseUrl}?id=${storyId}&viewMode=${viewMode}${stringifiedQueryParams}`
  });
  useEffect(() => {
    const newFrames = Object.values(refs).filter(r => {
      if (r.error) {
        return false;
      }

      if (r.type === 'auto-inject') {
        return true;
      }

      if (story && r.id === story.refId) {
        return true;
      }

      return false;
    }).reduce((acc, r) => {
      return Object.assign({}, acc, {
        [`storybook-ref-${r.id}`]: `${r.url}/iframe.html?id=${storyId}&viewMode=${viewMode}&refId=${r.id}${stringifiedQueryParams}`
      });
    }, frames);
    setFrames(newFrames);
  }, [storyId, story, refs]);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Global, {
    styles: styles
  }), Object.entries(frames).map(([id, src]) => /*#__PURE__*/React.createElement(Fragment, {
    key: id
  }, /*#__PURE__*/React.createElement(IFrame, {
    active: id === active,
    key: refs[id] ? refs[id].url : id,
    id: id,
    title: id,
    src: src,
    allowFullScreen: true,
    scale: scale
  }))));
};
FramesRenderer.displayName = "FramesRenderer";