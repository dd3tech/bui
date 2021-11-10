import { FunctionComponent, ReactNode, ElementType, ComponentProps } from 'react';
import { Story as PureStory } from '@storybook/components';
import { Args, BaseAnnotations } from '@storybook/addons';
import { DocsContextProps } from './DocsContext';
export declare const storyBlockIdFromId: (storyId: string) => string;
declare type PureStoryProps = ComponentProps<typeof PureStory>;
declare type CommonProps = BaseAnnotations<Args, any> & {
    height?: string;
    inline?: boolean;
};
declare type StoryDefProps = {
    name: string;
    children: ReactNode;
};
declare type StoryRefProps = {
    id?: string;
};
declare type StoryImportProps = {
    name: string;
    story: ElementType;
};
export declare type StoryProps = (StoryDefProps | StoryRefProps | StoryImportProps) & CommonProps;
export declare const lookupStoryId: (storyName: string, { mdxStoryNameToKey, mdxComponentMeta }: DocsContextProps) => string;
export declare const getStoryProps: (props: StoryProps, context: DocsContextProps) => PureStoryProps;
declare const Story: FunctionComponent<StoryProps>;
export { Story };
