declare type OptionsEntry = {
    name: string;
};
declare type Entry = string | OptionsEntry;
export declare const verifyDocsBeforeControls: (addons: Entry[]) => boolean;
export declare const ensureDocsBeforeControls: (configDir: string) => void;
export {};
