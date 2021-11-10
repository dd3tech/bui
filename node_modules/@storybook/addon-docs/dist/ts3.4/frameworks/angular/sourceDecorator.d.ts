import { StoryContext, StoryFn } from '@storybook/addons';
import { IStory } from '@storybook/angular';
export declare const skipSourceRender: (context: StoryContext) => any;
/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context  StoryContext
 */
export declare const sourceDecorator: (storyFn: StoryFn<IStory>, context: StoryContext) => IStory;
