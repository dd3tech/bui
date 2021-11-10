/// <reference types="webpack-env" />
import { DecorateStoryFunction, Channel } from '@storybook/addons';
import { ClientApi, ConfigApi } from '@storybook/client-api';
import { RenderStoryFunction } from './types';
export default function start(render: RenderStoryFunction, { decorateStory }?: {
    decorateStory?: DecorateStoryFunction;
}): {
    configure: (framework: string, loadable: import("./types").Loadable, m: NodeModule, showDeprecationWarning?: boolean) => void;
    clientApi: ClientApi;
    configApi: ConfigApi;
    channel: Channel;
    forceReRender: () => void;
};
