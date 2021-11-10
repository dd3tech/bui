import { Configuration } from 'webpack';
import { ManagerWebpackOptions, Options } from '@storybook/core-common';
export declare function managerWebpack(_: Configuration, options: Options & ManagerWebpackOptions): Promise<Configuration>;
export declare function managerEntries(installedAddons: string[], options: {
    managerEntry: string;
    configDir: string;
    modern?: boolean;
}): Promise<string[]>;
