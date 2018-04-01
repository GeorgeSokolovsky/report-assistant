import * as _ from 'lodash';
import * as parser from 'csv-parse';
import * as stringify from 'csv-stringify';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { Entity } from '../models/entity';
import { Clothes } from '../models/clothes';
import { Employee } from '../models/employee';
import { defaultEntities } from './defaultEntities';
import { Application } from '../models/application';

const { remote } = require('electron');
const fs = remote.require('fs');
const { join } = require('path');

@Injectable()
export class EntitiesStorage {
  private idsStore: {[className: string]: number} = {};
  private entitiesStore: {[collectionName: string]: Entity[]} = {};

  constructor() {
      this.initFoldersAndFiles();
  }

  loadAll(): Observable<boolean> {
    return Observable.zip(this.loadClothes(), this.loadEmployee(), this.loadApplications())
      .map(res => _.isEmpty(res));
  }

  loadClothes(): Observable<Clothes[]> {
    return this.loadEntity<Clothes>(config.name.clothes)
      .do(clothes => this.entitiesStore[config.collections.clothes] = clothes)
      .do(clothes => this.updateIdsStore(_.last(clothes)));
  }

  public loadEmployee(): Observable<Employee[]> {
    return this.loadEntity<Employee>(config.name.employee)
      .do(employees => this.entitiesStore[config.collections.employee] = employees)
      .do(employees => this.updateIdsStore(_.last(employees)));
  }

  public loadApplications(): Observable<Application[]> {
    return this.loadEntity<Application>(config.name.application)
      .do(applications => this.entitiesStore[config.collections.application] = applications)
      .do(applications => this.updateIdsStore(_.last(applications)));
  }

  public getCloth(siz: number): Clothes {
    const collectionName = _.get(config.collections, 'clothes');
    const collection = this.entitiesStore[collectionName] as Clothes[];

    return _.find(collection, {siz});
  }

  public getEmployees(): Employee[] {
    return this.entitiesStore.employee as Employee[];
  }

  public getEmployee(id: number): Employee {
    return this.getEntity(config.name.employee, id);
  }

  public saveApplication(application: Application): Application {
    const {collections} = config;

    return this.saveEntity(collections.application, application) as Application;
  }

  public saveEmployee(employee: Employee): Employee {
    const {collections} = config;

    return this.saveEntity(collections.employee, employee) as Employee;
  }

  public saveClothes(clothes: Clothes): Clothes {
    const {collections} = config;

    return this.saveEntity(collections.clothes, clothes) as Clothes;
  }

  public removeApplication(id: number) {
    const {application} = config.collections;

    _.remove(this.entitiesStore[application], {id});
  }

  private loadEntity<T extends Entity>(name: string): Observable<T[]> {
    const {path, classes} = config;

    return Observable.create((observer) => {
      const file = join(__dirname, _.get(path, name));

      fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
          throw err;
        }

        parser(data, {}, (source) => {
          const entityClass = _.get(classes, name, Entity);
          const entities = _(source || defaultEntities[name])
            .map(entity => new entityClass(entity))
            .orderBy('id')
            .value();

          observer.next(entities);
          observer.complete();
        });
      });
    });
  }

  private getEntity<T extends Entity>(name: string, id: number): T {
    const collection = this.entitiesStore[_.get(config.collections, name)];

    return _.find(collection, {id}) as T;
  }

  private saveEntity(collectionName: string, entity: Entity): Entity {
    this.updateEntityId(entity);
    this.pushEntity(collectionName, entity);

    const entityClassName = entity.getClassName();

    stringify(this.entitiesStore[entityClassName], (err, out) => {
      if (err) throw err;

      fs.writeFileSync(`${__dirname}${config.path[entityClassName]}`, out);
    });

    return entity;
  }

  private updateEntityId(entity: Entity): Entity {
    if (entity.id) {
      return;
    }

    if (!this.idsStore[entity.getClassName()]) {
      this.idsStore[entity.getClassName()] = 0;
    }

    this.idsStore[entity.getClassName()] += 1;

    entity.id = this.idsStore[entity.getClassName()];
  }

  private updateIdsStore(entity: Entity): void {
    if (!entity) {
      return;
    }

    this.idsStore[entity.getClassName()] = entity.id;
  }

  private pushEntity(collectionName: string, entity: Entity): void {
    const collection = this.entitiesStore[collectionName];

    if (!collection) {
      this.entitiesStore[collectionName] = [];
    }

    if (_.some(collection, {id: entity.id})) {
      const instance = _.find(collection, {id: entity.id});

      _.assignIn(instance, entity);

      return;
    }

    this.entitiesStore[collectionName].push(entity);
  }

  private createFile(path: string): Promise<boolean> {
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

  private initFoldersAndFiles() {
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
