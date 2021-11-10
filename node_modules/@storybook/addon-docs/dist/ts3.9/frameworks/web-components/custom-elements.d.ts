interface TagItem {
    name: string;
    type: string;
    description: string;
    default?: any;
    defaultValue?: any;
}
interface Tag {
    name: string;
    description: string;
    attributes?: TagItem[];
    properties?: TagItem[];
    events?: TagItem[];
    methods?: TagItem[];
    slots?: TagItem[];
    cssProperties?: TagItem[];
    cssParts?: TagItem[];
}
interface CustomElements {
    tags: Tag[];
}
export declare const extractArgTypesFromElements: (tagName: string, customElements: CustomElements) => {
    [x: string]: import("@storybook/api").ArgType;
};
export declare const extractArgTypes: (tagName: string) => {
    [x: string]: import("@storybook/api").ArgType;
};
export declare const extractComponentDescription: (tagName: string) => string;
export {};
