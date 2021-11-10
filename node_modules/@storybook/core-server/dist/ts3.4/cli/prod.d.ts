import { CommanderStatic } from 'commander';
export interface ProdCliOptions {
    staticDir?: string[];
    outputDir?: string;
    configDir?: string;
    watch?: boolean;
    quiet?: boolean;
    loglevel?: string;
    dll?: boolean;
    docsDll?: boolean;
    uiDll?: boolean;
    debugWebpack?: boolean;
    previewUrl?: string;
    forceBuildPreview?: boolean;
    docs?: boolean;
    modern?: boolean;
}
export declare function getProdCli(packageJson: {
    version: string;
    name: string;
}): CommanderStatic & ProdCliOptions;
