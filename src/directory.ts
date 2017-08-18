import * as mkdirp from 'mkdirp';
export class directory {

    public createDirectory(path: string): Promise<void> {
        let promise = new Promise<void>((resole, reject) => {
            mkdirp(path, err => !err ? resole() : reject(err));
        })
        return promise;
    }
}