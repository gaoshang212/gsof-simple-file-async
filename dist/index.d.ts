/// <reference types="node" />
declare module "file" {
    import * as fs from 'fs';
    export class file {
        constructor();
        exists(path: string): Promise<boolean>;
        delete(path: string): Promise<void>;
        readAllText(path: string): Promise<string>;
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
}
declare module "index" {
    import { file } from "file";
    var _default: file;
    export default _default;
}
declare module "test/test" {
}
