import { ClientApi, StoryStore, ConfigApi } from '@storybook/client-api';
import { toId } from '@storybook/csf';
import start from './start';
declare const _default: {
    start: typeof start;
    toId: (kind: string, name: string) => string;
    ClientApi: typeof ClientApi;
    ConfigApi: typeof ConfigApi;
    StoryStore: typeof StoryStore;
};
export default _default;
export { start, toId, ClientApi, ConfigApi, StoryStore };
