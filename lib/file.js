"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class file {
    constructor() {
    }
    exists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                fs.exists(path, (exits) => {
                    resolve(exits);
                });
            });
            return promise;
        });
    }
    delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                fs.unlink(path, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
            return promise;
        });
    }
    readAllText(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
            return promise;
        });
    }
    readAllJson(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let text = yield this.readAllText(path);
            return text ? JSON.parse(text) : undefined;
        });
    }
    writeAllBytes(path, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                fs.open(path, 'w', (err, fd) => {
                    let notiyError = (error) => {
                        fs.close(fd, () => {
                            reject(err);
                        });
                    };
                    if (err) {
                        notiyError(err);
                        return;
                    }
                    fs.write(fd, buffer, (error, written) => {
                        if (error) {
                            notiyError(err);
                            return;
                        }
                        fs.close(fd, () => {
                            resolve();
                        });
                    });
                });
            });
            return promise;
        });
    }
    stat(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.exists(path))) {
                return null;
            }
            let promise = new Promise((resolve, reject) => {
                fs.stat(path, (err, stats) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(stats);
                    }
                });
            });
            return promise;
        });
    }
    writeAllText(path, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                fs.open(path, 'w', (err, fd) => {
                    let notiyError = (error) => {
                        fs.close(fd, () => {
                            reject(err);
                        });
                    };
                    if (err) {
                        notiyError(err);
                        return;
                    }
                    fs.write(fd, content, (error, written) => {
                        if (error) {
                            notiyError(err);
                            return;
                        }
                        fs.close(fd, () => {
                            resolve();
                        });
                    });
                });
            });
            return promise;
        });
    }
    writeByJson(path, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = JSON.stringify(obj);
            yield this.writeAllText(path, json);
        });
    }
    /**
     * 检查文件夹读写权限
     * @param path 目录
     */
    checkAccess(p_path) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                let writeable, readable;
                let run = () => {
                    if (writeable == undefined || readable == undefined) {
                        return;
                    }
                    resolve({ writeable, readable });
                };
                fs.access(p_path, fs.constants.W_OK, (err) => {
                    writeable = !err && true;
                    run();
                });
                fs.access(p_path, fs.constants.R_OK, (err) => {
                    readable = !err && true;
                    run();
                });
            });
            return promise;
        });
    }
    /**
     * 移动文件（重命名）
     * @param oldPath
     * @param newPath
     */
    move(oldPath, newPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
            return promise;
        });
    }
}
exports.file = file;
//# sourceMappingURL=file.js.map