import { ArgTypes } from '@storybook/addons';
export declare type PropDescriptor = string[] | RegExp;
export declare const filterArgTypes: (argTypes: ArgTypes, include?: PropDescriptor, exclude?: PropDescriptor) => ArgTypes;
