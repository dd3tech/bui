interface ParamsId {
    storyId: string;
}
interface ParamsCombo {
    kind: string;
    story: string;
}
export declare const navigate: (params: ParamsId | ParamsCombo) => void;
export declare const linkTo: (idOrKindInput: string, storyInput?: string | ((...args: any[]) => string)) => (...args: any[]) => void;
export declare const hrefTo: (kind: string, name: string) => Promise<string>;
export declare const withLinks: (...args: any) => any;
export {};
