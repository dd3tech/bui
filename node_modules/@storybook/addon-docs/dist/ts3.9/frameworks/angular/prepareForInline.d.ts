import React from 'react';
import { IStory, StoryContext } from '@storybook/angular';
import { StoryFn } from '@storybook/addons';
/**
 * Uses the angular renderer to generate a story. Uses p-limit to run synchronously
 */
export declare const prepareForInline: (storyFn: StoryFn<IStory>, { id, parameters }: StoryContext) => React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
