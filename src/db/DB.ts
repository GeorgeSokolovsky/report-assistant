import { Observable } from 'rxjs/Observable';
import { Entity } from '../models/entity';
import * as _ from 'lodash';
import * as parser from 'csv-parse';
import * as stringify from 'csv-stringify';

const { remote } = require('electron');
const fs = remote.require('fs');

interface EntityConstructor<T = Entity> {
    fields: string[];
    new (...args): T;
}

export class DB {
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
                });
            });

        });
    }
}