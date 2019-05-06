/// <reference types="node" />
declare module "file" {
    import * as fs from 'fs';
    export class file {
        constructor();
        exists(path: string): Promise<boolean>;
        delete(path: string): Promise<void>;
        readAllText(path: string): Promise<string>;
        readAllJson<T>(path: string): Promise<T>;
        readAllBlob(path: string): Promise<Blob>;
        writeAllBytes(path: string, buffer: Buffer): Promise<void>;
        stat(path: string): Promise<fs.Stats>;
        writeAllText(path: string, content: string): Promise<void>;
        writeByJson(path: string, obj: any): Promise<void>;
        /**
         * 检查文件夹读写权限
         * @param path 目录
         */
        checkAccess(p_path: string): Promise<{
            writeable: boolean;
            readable: boolean;
        }>;
        /**
         * 移动文件（重命名）
         * @param oldPath
         * @param newPath
         */
        move(oldPath: string, newPath: string): Promise<void>;
        isFile(path: string): Promise<boolean>;
    }
}
declare module "index" {
    import { file } from "file";
    import { directory } from "directory";
    const f: file;
    const d: directory;
    export { f as file, d as directory };
}
declare module "directory" {
    export class directory {
        isDirectory(path: string): Promise<boolean>;
        createDirectory(path: string): Promise<void>;
        delete(path: string): Promise<void>;
        getDirectories(path: string): Promise<string[]>;
        getFiles(path: string, func: (file: string) => boolean): Promise<string[]>;
    }
}
