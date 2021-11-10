import { StoryFn } from '@storybook/addons';
import { extractComponentDescription } from '../../lib/docgen';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: StoryFn) => unknown;
        extractArgTypes: import("../../lib/docgen").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
export declare const decorators: ((storyFn: any, context: import("@storybook/addons").StoryContext) => any)[];
