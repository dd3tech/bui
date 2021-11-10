import qs from 'qs';
import { StoreSelectionSpecifier, StoreSelection } from '@storybook/client-api';
export declare function pathToId(path: string): string;
export declare const setPath: (selection?: StoreSelection) => void;
export declare const parseQueryParameters: (search: string) => string | string[] | qs.ParsedQs | qs.ParsedQs[];
export declare const getSelectionSpecifierFromPath: () => StoreSelectionSpecifier;
