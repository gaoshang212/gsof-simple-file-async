/// <reference types="node" />
import * as fs from 'fs';
export declare class file {
    constructor();
    exists(path: string): Promise<boolean>;
    delete(path: string): Promise<void>;
    readAllText(path: string): Promise<string>;
    readAllJson<T>(path: string): Promise<T>;
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
}
