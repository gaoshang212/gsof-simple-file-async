export declare class directory {
    isDirectory(path: string): Promise<boolean>;
    createDirectory(path: string): Promise<void>;
    delete(path: string): Promise<void>;
    getDirectories(path: string): Promise<string[]>;
    getFiles(path: string, func: (file: string) => boolean): Promise<string[]>;
}
