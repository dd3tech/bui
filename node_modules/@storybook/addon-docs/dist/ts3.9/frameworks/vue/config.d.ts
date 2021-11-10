/// <reference types="react" />
import { extractComponentDescription } from '../../lib/docgen';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/addons").StoryFn<unknown>, { args }: import("@storybook/addons").StoryContext) => import("react").DetailedReactHTMLElement<null, HTMLElement>;
        extractArgTypes: import("../../lib/docgen").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
export declare const decorators: ((storyFn: any, context: import("@storybook/addons").StoryContext) => any)[];
