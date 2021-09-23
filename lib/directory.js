"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directory = void 0;
const mkdirp = require("mkdirp");
const fs = require("fs");
const rimraf = require("rimraf");
const path_1 = require("path");
const _1 = require("./");
class directory {
    isDirectory(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let stat = yield _1.file.stat(path);
            return stat && stat.isDirectory();
        });
    }
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
            fs.readdir(path, (err, files) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(err);
                }
                else {
                    let result = [];
                    for (let file of files.map(i => path_1.join(path, i))) {
                        if (!(yield this.isDirectory(file))) {
                            continue;
                        }
                        result.push(file);
                    }
                    resole(result);
                }
            }));
        });
        return promise;
    }
    getFiles(path, func) {
        let promise = new Promise((resole, reject) => {
            fs.readdir(path, (err, files) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(err);
                }
                else {
                    let result = [];
                    for (let fl of files.map(i => path_1.join(path, i))) {
                        if (yield this.isDirectory(fl)) {
                            let fls = yield this.getFiles(fl, func);
                            result.push(...fls);
                        }
                        else if (func(fl)) {
                            result.push(fl);
                        }
                    }
                    resole(result);
                }
            }));
        });
        return promise;
    }
}
exports.directory = directory;
//# sourceMappingURL=directory.js.map