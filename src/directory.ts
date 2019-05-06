import * as mkdirp from 'mkdirp';
import * as fs from "fs";

import * as rimraf from "rimraf";
import { join } from 'path';
import { file } from "./";

export class directory {

    public async isDirectory(path: string) {
        let stat = await file.stat(path)
        return stat.isDirectory();
    }

    public createDirectory(path: string): Promise<void> {
        let promise = new Promise<void>((resole, reject) => {
            mkdirp(path, err => !err ? resole() : reject(err));
        })
        return promise;
    }

    public delete(path: string) {
        let promise = new Promise<void>((resole, reject) => {
            rimraf(path, err => !err ? resole() : reject(err));
        });
        return promise;
    }

    public getDirectories(path: string) {
        let promise = new Promise<string[]>((resole, reject) => {
            fs.readdir(path, async (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    let result: string[] = [];
                    for (let file of files.map(i => join(path, i))) {
                        if (!await this.isDirectory(file)) {
                            continue;
                        }
                        result.push(file);
                    }
                    resole(result);
                }
            })
        });
        return promise;
    }

    public getFiles(path: string, func: (file: string) => boolean) {
        let promise = new Promise<string[]>((resole, reject) => {
            fs.readdir(path, async (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    let result: string[] = [];
                    for (let fl of files.map(i => join(path, i))) {
                        if (await this.isDirectory(fl)) {
                            let fls = await this.getFiles(fl, func);
                            result.push(...fls)
                        } else if (func(fl)) {
                            result.push(fl);
                        }

                    }
                    resole(result);
                }
            })
        });
        return promise;
    }
}