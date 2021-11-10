import { Args, ModuleFn } from '../index';
export interface SubState {
    globals: Args;
}
export interface SubAPI {
    updateGlobals: (newGlobals: Args) => void;
}
export declare const init: ModuleFn;
