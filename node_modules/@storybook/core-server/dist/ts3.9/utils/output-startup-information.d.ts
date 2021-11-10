import { VersionCheck } from '@storybook/core-common';
export declare function outputStartupInformation(options: {
    updateInfo: VersionCheck;
    version: string;
    address: string;
    networkAddress: string;
    managerTotalTime?: [number, number];
    previewTotalTime?: [number, number];
}): void;
