export declare function useStatics(router: any, options: {
    staticDir?: string[];
}): Promise<void>;
export declare const parseStaticDir: (arg: string) => Promise<{
    staticDir: string;
    staticPath: string;
    targetDir: string;
    targetEndpoint: string;
}>;
