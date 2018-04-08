import { Observable } from 'rxjs/Observable';
import { Entity } from '../models/entity';
import * as _ from 'lodash';
import * as parser from 'csv-parse';
import * as stringify from 'csv-stringify';
import { config } from '../../config/config';

const fs = require('graceful-fs');

interface EntityConstructor<T = Entity> {
    fields: string[];
    new (...args): T;
}

export class DB {

    static init() {
        DB.initFoldersAndFiles();
    }

    static readFrom<T = Entity>(fileName: string, clazz: EntityConstructor<T>): Observable<T[]> {
        return Observable.create(observer => {

            fs.readFile(fileName, {encoding: 'utf-8'}, (err, data) => {
                if (err) {
                    observer.error(err);

                    return;
                }

                parser(data, {columns: clazz.fields}, (err, source) => {
                    if (err) {
                        observer.error(err);

                        return;
                    }

                    const entities = _(source)
                        .map(entity => new clazz(entity))
                        .orderBy('id')
                        .value();

                    observer.next(entities);
                    observer.complete();
                });
            });
        });
    }

    static writeTo<T = Entity>(fileName: string, data: T[]): Observable<void> {
        return Observable.create(observer => {

            stringify(data, (err, out) => {
                if (err) {
                    observer.error(err);

                    return;
                }

                fs.writeFile(fileName, out, err => {
                    if (err) observer.error(err);

                    observer.next();
                    observer.complete();
                });
            });

        });
    }

    private static createFile(path: string): Promise<boolean> {
        const updatedPath = __dirname + path;

        if (fs.existsSync(updatedPath)) {
            return Promise.resolve(true);
        }

        return new Promise((res, rej) => {
            fs.open(updatedPath, 'wx', (err, fd) => {
                if (err) rej(err);

                fs.close(fd, err => {
                    if (err) rej(err);

                    res(true);
                });
            });
        });
    }

    private static initFoldersAndFiles() {
        const dir = `${__dirname}/data`;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        this.createFile(config.path.application)
            .then(() => this.createFile(config.path.clothes))
            .then(() => this.createFile(config.path.employee))
            .catch(err => {
                throw err;
            });
    }
}