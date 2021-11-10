/// <reference types="react" />
import { extractComponentDescription } from './extractComponentDescription';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/addons").StoryFn<unknown>) => import("react").DetailedReactHTMLElement<import("react").HTMLAttributes<any>, any>;
        extractArgTypes: import("../../lib/docgen").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
export declare const decorators: ((storyFn: any, context: import("@storybook/addons").StoryContext) => any)[];
