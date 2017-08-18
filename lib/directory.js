"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mkdirp = require("mkdirp");
class directory {
    createDirectory(path) {
        let promise = new Promise((resole, reject) => {
            mkdirp(path, err => !err ? resole() : reject(err));
        });
        return promise;
    }
}
exports.directory = directory;
//# sourceMappingURL=directory.js.map