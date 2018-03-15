"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mkdirp = require("mkdirp");
const fs = require("fs");
const rimraf = require("rimraf");
class directory {
    createDirectory(path) {
        let promise = new Promise((resole, reject) => {
            mkdirp(path, err => !err ? resole() : reject(err));
        });
        return promise;
    }
    delete(path) {
        let promise = new Promise((resole, reject) => {
            rimraf(path, err => !err ? resole() : reject(err));
        });
        return promise;
    }
    getDirectories(path) {
        let promise = new Promise((resole, reject) => {
            fs.readdir(path, (err, files) => {
                !err ? resole(files) : reject(err);
            });
        });
        return promise;
    }
}
exports.directory = directory;
//# sourceMappingURL=directory.js.map