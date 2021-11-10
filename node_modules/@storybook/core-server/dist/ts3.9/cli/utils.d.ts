export declare function parseList(str: string): string[];
export declare function getEnvConfig(program: Record<string, any>, configEnv: Record<string, any>): void;
export declare function checkDeprecatedFlags(options: {
    dll?: boolean;
    uiDll?: boolean;
    docsDll?: boolean;
}): void;
