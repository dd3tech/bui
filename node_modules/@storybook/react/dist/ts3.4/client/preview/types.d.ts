import { ReactElement } from 'react';
export { RenderContext } from '@storybook/client-api';
export { StoryContext } from '@storybook/addons';
export interface ShowErrorArgs {
    title: string;
    description: string;
}
export declare type StoryFnReactReturnType = ReactElement<unknown>;
export interface IStorybookStory {
    name: string;
    render: () => any;
}
export interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}
