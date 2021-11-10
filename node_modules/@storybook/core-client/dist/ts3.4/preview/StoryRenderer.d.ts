import { StoryId, StoryKind, StoryFn, ViewMode, Channel } from '@storybook/addons';
import { StoryStore } from '@storybook/client-api';
import { RenderStoryFunction, RenderContextWithoutStoryContext } from './types';
interface RenderMetadata {
    id: StoryId;
    kind: StoryKind;
    viewMode: ViewMode;
    getDecorated: () => StoryFn<any>;
}
declare const layoutClassMap: {
    readonly centered: "sb-main-centered";
    readonly fullscreen: "sb-main-fullscreen";
    readonly padded: "sb-main-padded";
};
declare type Layout = keyof typeof layoutClassMap | 'none';
/**
 * StoryRenderer is responsible for rendering the correct story to the screen
 *
 * It is very much concerned with drawing to the screen and will do things like change classes
 * on the body etc.
 */
export declare class StoryRenderer {
    render: RenderStoryFunction;
    channel?: Channel;
    storyStore: StoryStore;
    previousMetadata?: RenderMetadata;
    previousLayoutClass?: typeof layoutClassMap[keyof typeof layoutClassMap] | null;
    constructor({ render, channel, storyStore, }: {
        render: RenderStoryFunction;
        channel?: Channel;
        storyStore: StoryStore;
    });
    setupListeners(): void;
    forceReRender(): void;
    renderCurrentStory(forceRender: boolean): Promise<void>;
    renderStoryIfChanged({ metadata, context, }: {
        metadata: RenderMetadata;
        context: RenderContextWithoutStoryContext;
    }): Promise<void>;
    applyLayout(layout?: Layout): void;
    checkIfLayoutExists(layout: keyof typeof layoutClassMap): void;
    showErrorDisplay({ message, stack }: {
        message?: string;
        stack?: string;
    }): void;
    showNoPreview(): void;
    showMain(): void;
    showDocs(): void;
    showStory(): void;
    renderStory({ context, context: { id, getDecorated }, }: {
        context: RenderContextWithoutStoryContext;
    }): Promise<void>;
    renderDocs({ context, storyStore, }: {
        context: RenderContextWithoutStoryContext;
        storyStore: StoryStore;
    }): void;
    renderException(err: Error): void;
    renderError({ title, description }: {
        title: string;
        description: string;
    }): void;
}
export {};
