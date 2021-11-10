import { Channel } from '@storybook/channels';
import { Parameters, Args, LegacyStoryFn, StoryKind } from '@storybook/addons';
import { DecoratorFunction, StoryMetadata, StoreData, AddStoryArgs, StoreItem, PublishedStoreItem, ErrorLike, GetStorybookKind, ArgsEnhancer, ArgTypesEnhancer, StoreSelectionSpecifier, StoreSelection } from './types';
interface StoryOptions {
    includeDocsOnly?: boolean;
}
declare type KindMetadata = StoryMetadata & {
    order: number;
};
interface AllowUnsafeOption {
    allowUnsafe?: boolean;
}
export default class StoryStore {
    _error?: ErrorLike;
    _channel: Channel;
    _configuring: boolean;
    _globals: Args;
    _initialGlobals: Args;
    _defaultGlobals: Args;
    _globalMetadata: StoryMetadata;
    _kinds: Record<string, KindMetadata>;
    _stories: StoreData;
    _argsEnhancers: ArgsEnhancer[];
    _argTypesEnhancers: ArgTypesEnhancer[];
    _selectionSpecifier?: StoreSelectionSpecifier;
    _selection?: StoreSelection;
    constructor(params: {
        channel: Channel;
    });
    setupListeners(): void;
    startConfiguring(): void;
    finishConfiguring(): void;
    addGlobalMetadata({ parameters, decorators, loaders }: StoryMetadata): void;
    clearGlobalDecorators(): void;
    ensureKind(kind: string): void;
    addKindMetadata(kind: string, { parameters, decorators, loaders }: StoryMetadata): void;
    addArgsEnhancer(argsEnhancer: ArgsEnhancer): void;
    addArgTypesEnhancer(argTypesEnhancer: ArgTypesEnhancer): void;
    combineStoryParameters(parameters: Parameters, kind: StoryKind): Parameters;
    shouldBlockAddingStory(id: string): boolean;
    shouldBlockAddingKindMetadata(kind: string): boolean;
    addStory({ id, kind, name, storyFn: original, parameters: storyParameters, decorators: storyDecorators, loaders: storyLoaders, }: AddStoryArgs, { applyDecorators, allowUnsafe, }: {
        applyDecorators: (fn: LegacyStoryFn, decorators: DecoratorFunction[]) => any;
    } & AllowUnsafeOption): void;
    remove: (id: string, { allowUnsafe }?: AllowUnsafeOption) => void;
    removeStoryKind(kind: string, { allowUnsafe }?: AllowUnsafeOption): void;
    updateGlobals(newGlobals: Args): void;
    updateStoryArgs(id: string, newArgs: Args): void;
    resetStoryArgs(id: string, argNames?: string[]): void;
    fromId: (id: string) => PublishedStoreItem | null;
    raw(options?: StoryOptions): PublishedStoreItem[];
    sortedStories(): StoreItem[];
    extract(options?: StoryOptions & {
        normalizeParameters?: boolean;
    }): {};
    clearError(): void;
    setError: (err: ErrorLike) => void;
    getError: () => ErrorLike | undefined;
    setSelectionSpecifier(selectionSpecifier: StoreSelectionSpecifier): void;
    setSelection(selection: StoreSelection): void;
    isSingleStoryMode(): boolean;
    getSelection: () => StoreSelection;
    getDataForManager: () => {
        v: number;
        globalParameters: Parameters;
        globals: Args;
        error: ErrorLike;
        kindParameters: {
            [x: string]: Parameters;
        };
        stories: {};
    };
    getStoriesJsonData: () => {
        v: number;
        globalParameters: Pick<Parameters, string>;
        kindParameters: {
            [x: string]: Pick<Parameters, string>;
        };
        stories: {};
    };
    pushToManager: () => void;
    getStoryKinds(): string[];
    getStoriesForKind: (kind: string) => PublishedStoreItem[];
    getRawStory(kind: string, name: string): PublishedStoreItem;
    cleanHooks(id: string): void;
    cleanHooksForKind(kind: string): void;
    getStorybook(): GetStorybookKind[];
    private mergeAdditionalDataToStory;
}
export {};
