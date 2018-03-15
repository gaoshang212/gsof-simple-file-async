export declare class directory {
    createDirectory(path: string): Promise<void>;
    delete(path: string): Promise<void>;
    getDirectories(path: string): Promise<string[]>;
}
