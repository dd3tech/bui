/// <reference types="react" />
import { SourceType } from '../../shared';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/addons").StoryFn<import("@storybook/angular").IStory>, { id, parameters }: import("@storybook/angular").StoryContext) => import("react").DetailedReactHTMLElement<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
        extractArgTypes: (component: import("./types").Directive) => import("@storybook/api").ArgTypes;
        extractComponentDescription: (component: import("./types").Directive) => string;
        source: {
            type: SourceType;
            language: string;
        };
    };
};
export declare const decorators: ((storyFn: import("@storybook/addons").StoryFn<import("@storybook/angular").IStory>, context: import("@storybook/addons").StoryContext) => import("@storybook/angular").IStory)[];
