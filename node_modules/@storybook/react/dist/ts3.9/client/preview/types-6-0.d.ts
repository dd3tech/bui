import { ComponentType } from 'react';
import { Args as DefaultArgs, Annotations, BaseMeta, BaseStory } from '@storybook/addons';
import { StoryFnReactReturnType } from './types';
export type { Args, ArgTypes, Parameters, StoryContext } from '@storybook/addons';
declare type ReactComponent = ComponentType<any>;
declare type ReactReturnType = StoryFnReactReturnType;
/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export declare type Meta<Args = DefaultArgs> = BaseMeta<ReactComponent> & Annotations<Args, ReactReturnType>;
/**
 * Story function that represents a component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type Story<Args = DefaultArgs> = BaseStory<Args, ReactReturnType> & Annotations<Args, ReactReturnType>;
