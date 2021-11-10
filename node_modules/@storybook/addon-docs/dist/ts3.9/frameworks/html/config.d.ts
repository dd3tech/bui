import { StoryFn } from '@storybook/addons';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: StoryFn<string>) => JSX.Element;
    };
};
