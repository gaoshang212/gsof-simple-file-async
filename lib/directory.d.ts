export declare class directory {
    isDirectory(path: string): Promise<any>;
    createDirectory(path: string): Promise<void>;
    delete(path: string): Promise<void>;
    getDirectories(path: string): Promise<string[]>;
}
