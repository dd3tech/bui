import * as t from '@babel/types';
import { Node } from '@babel/traverse';
interface Meta {
    title?: string;
    component?: string;
    includeStories?: string[] | RegExp;
    excludeStories?: string[] | RegExp;
}
interface Story {
    id: string;
    name: string;
    parameters: Record<string, any>;
}
export declare class CsfFile {
    _ast: t.File;
    _meta?: Meta;
    _stories: Record<string, Story>;
    _metaAnnotations: Record<string, Node>;
    _storyExports: Record<string, t.VariableDeclarator>;
    _storyAnnotations: Record<string, Record<string, Node>>;
    _templates: Record<string, t.Expression>;
    constructor(ast: t.File);
    _parseMeta(declaration: t.ObjectExpression): void;
    parse(): this;
    get meta(): Meta;
    get stories(): Story[];
}
export declare const loadCsf: (code: string) => CsfFile;
export declare const formatCsf: (csf: CsfFile) => string;
export declare const readCsf: (fileName: string) => Promise<CsfFile>;
export declare const writeCsf: (fileName: string, csf: CsfFile) => Promise<void>;
export {};
