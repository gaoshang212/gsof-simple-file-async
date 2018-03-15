import * as mkdirp from 'mkdirp';
import * as fs from "fs";

import * as rimraf from "rimraf";

export class directory {

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
            fs.readdir(path, (err, files) => {
                !err ? resole(files) : reject(err);
            })
        });
        return promise;
    }
}