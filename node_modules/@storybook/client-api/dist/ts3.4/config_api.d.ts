/// <reference types="webpack-env" />
import StoryStore from './story_store';
export default class ConfigApi {
    _storyStore: StoryStore;
    constructor({ storyStore }: {
        storyStore: StoryStore;
    });
    configure: (loaders: () => void, module: NodeModule, showDeprecationWarning?: boolean) => void;
}
