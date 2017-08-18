import * as fs from 'fs';

export class file {

    constructor() {

    }

    public async exists(path: string): Promise<boolean> {

        let promise = new Promise<boolean>((resolve, reject) => {
            fs.exists(path, (exits) => {
                resolve(exits);
            });
        });

        return promise;
    }

    public async delete(path: string): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return promise;
    }

    public async readAllText(path: string): Promise<string> {
        let promise = new Promise<string>((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        return promise;
    }

    public async writeAllBytes(path: string, buffer: Buffer): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            fs.open(path, 'w', (err, fd) => {
                let notiyError = (error) => {
                    fs.close(fd, () => {
                        reject(err);
                    });
                };
                if (err) { notiyError(err); return; }
                fs.write(fd, buffer, (error, written) => {
                    if (error) { notiyError(err); return; }
                    fs.close(fd, () => {
                        resolve();
                    });
                });
            });
        });
        return promise;
    }

    public async stat(path: string): Promise<fs.Stats> {

        if (!await this.exists(path)) {
            return null;
        }

        let promise = new Promise<fs.Stats>((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if (err) { reject(err); }
                else {
                    resolve(stats);
                }
            })
        });

        return promise;
    }

    public async writeAllText(path: string, content: string): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            fs.open(path, 'w', (err, fd) => {
                let notiyError = (error) => {
                    fs.close(fd, () => {
                        reject(err);
                    });
                };
                if (err) { notiyError(err); return; }
                fs.write(fd, content, (error, written) => {
                    if (error) { notiyError(err); return; }
                    fs.close(fd, () => {
                        resolve();
                    });
                });
            });
        });
        return promise;
    }

    public async writeByJson(path: string, obj: any): Promise<void> {
        let json = JSON.stringify(obj);
        await this.writeAllText(path, json);
    }

    /**
     * 检查文件夹读写权限
     * @param path 目录
     */
    public async checkAccess(p_path: string): Promise<{ writeable: boolean, readable: boolean }> {
        let promise = new Promise<{ writeable: boolean, readable: boolean }>((resolve, reject) => {
            let writeable: boolean, readable: boolean;
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
    }

    /**
     * 移动文件（重命名）
     * @param oldPath 
     * @param newPath 
     */
    public async move(oldPath: string, newPath: string): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
        return promise;
    }
}
