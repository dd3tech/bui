import { DocsContextProps } from './DocsContext';
import { StoryData, Component } from './types';
export declare const getDocsStories: (context: DocsContextProps) => StoryData[];
export declare const getComponentName: (component: Component) => string;
export declare function scrollToElement(element: any, block?: string): void;
