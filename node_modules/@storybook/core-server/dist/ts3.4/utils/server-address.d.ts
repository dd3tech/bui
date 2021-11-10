export declare function getServerAddresses(port: number, host: string, proto: string): {
    address: string;
    networkAddress: string;
};
export declare const getServerPort: (port: number) => Promise<number>;
