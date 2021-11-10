import React from 'react';
import { StoryId, StoryKind, Args, Parameters } from '../index';
import { Provider } from '../modules/provider';
import { ViewMode } from '../modules/addons';
export type { StoryId };
export interface Root {
    id: StoryId;
    depth: 0;
    name: string;
    refId?: string;
    children: StoryId[];
    isComponent: false;
    isRoot: true;
    isLeaf: false;
    renderLabel?: (item: Root) => React.ReactNode;
    startCollapsed?: boolean;
}
export interface Group {
    id: StoryId;
    depth: number;
    name: string;
    children: StoryId[];
    refId?: string;
    parent?: StoryId;
    isComponent: boolean;
    isRoot: false;
    isLeaf: false;
    renderLabel?: (item: Group) => React.ReactNode;
    parameters?: {
        docsOnly?: boolean;
        viewMode?: ViewMode;
    };
}
export interface Story {
    id: StoryId;
    depth: number;
    parent: StoryId;
    name: string;
    kind: StoryKind;
    refId?: string;
    children?: StoryId[];
    isComponent: boolean;
    isRoot: false;
    isLeaf: true;
    renderLabel?: (item: Story) => React.ReactNode;
    parameters?: {
        fileName: string;
        options: {
            [optionName: string]: any;
        };
        docsOnly?: boolean;
        viewMode?: ViewMode;
        [parameterName: string]: any;
    };
    args: Args;
    initialArgs: Args;
}
export interface StoryInput {
    id: StoryId;
    name: string;
    refId?: string;
    kind: StoryKind;
    children: string[];
    parameters: {
        fileName: string;
        options: {
            [optionName: string]: any;
        };
        docsOnly?: boolean;
        viewMode?: ViewMode;
        [parameterName: string]: any;
    };
    isLeaf: boolean;
    args: Args;
    initialArgs: Args;
}
export interface StoriesHash {
    [id: string]: Root | Group | Story;
}
export declare type StoriesList = (Group | Story)[];
export declare type GroupsList = (Root | Group)[];
export interface StoriesRaw {
    [id: string]: StoryInput;
}
export declare type SetStoriesPayload = {
    v: 2;
    error?: Error;
    globals: Args;
    globalParameters: Parameters;
    stories: StoriesRaw;
    kindParameters: {
        [kind: string]: Parameters;
    };
} | ({
    v?: number;
    stories: StoriesRaw;
} & Record<string, never>);
export declare const denormalizeStoryParameters: ({ globalParameters, kindParameters, stories, }: SetStoriesPayload) => StoriesRaw;
export declare const transformStoriesRawToStoriesHash: (input: StoriesRaw, { provider }: {
    provider: Provider;
}) => StoriesHash;
export declare type Item = StoriesHash[keyof StoriesHash];
export declare function isRoot(item: Item): item is Root;
export declare function isGroup(item: Item): item is Group;
export declare function isStory(item: Item): item is Story;
