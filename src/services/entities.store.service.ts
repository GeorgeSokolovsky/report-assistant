import * as _ from 'lodash';
import { readFile } from 'fs';
import * as parser from 'csv-parse';
import * as stringify from 'csv-stringify';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { Entity } from '../models/Entity';
import { Cloth } from '../models/Cloth';
import { Employee } from '../models/Employee';

@Injectable()
export class EntitiesStore {
  private idsStore: {[className: string]: number} = {};
  private entitiesStore: {[collectionName: string]: Array<Entity>} = {};

  public loadAll(): Observable<boolean> {
    return Observable.zip(this.loadClothes(), this.loadEmployee()).map(res => _.isEmpty(res));
  }

  public loadClothes(): Observable<Array<Cloth>> {
    return this.loadEntity(config.name.cloth)
      .do(clothes => this.entitiesStore[config.collections.cloth] = clothes)
      .do(clothes => this.updateIdsStore(_.last(clothes)));
  }

  public loadEmployee(): Observable<Array<Employee>> {
    return this.loadEntity(config.name.employee)
      .do(employees => this.entitiesStore[config.collections.employee] = employees)
      .do(employees => this.updateIdsStore(_.last(employees)));
  }

  public getCloth(id: number): Cloth {
   return this.getEntity(config.name.cloth, id);
  }

  public getEmployee(id: number): Employee {
    return this.getEntity(config.name.employee, id);
  }

  private loadEntity(name: string): Observable<Array<Entity>> {
    const {path, classes} = config;

    return Observable.create(observer => {
      readFile(__dirname + _.get(path, name), {encoding: 'utf-8'}, (err, data) => {
        if (err) {
          throw err;
        }

        parser(data, {}, source => {
          const entityClass = _.get(classes, name, Entity);
          const entities = _(source)
            .map(data => new entityClass(data))
            .orderBy('id')
            .value();

          observer.next(entities);
          observer.complete();
        });
      });
    });
  }

  private getEntity(name: string, id: number): Entity {
    const collection = this.entitiesStore[_.get<string>(config.collections, name)];

    return _.find<Entity>(collection, {id});
  }

  private saveEntity(collectionName: string, entity: Entity): void {
    this.updateEntityId(entity);
    this.pushEntity(collectionName, entity);

    stringify(this.entitiesStore[entity.getClassName()], () => {
      // todo fix this
      console.log('something saved');
    });
  }

  private updateEntityId(entity: Entity): Entity {
    if (entity.id) {
      return;
    }

    this.idsStore[entity.getClassName()] += 1;

    entity.id = this.idsStore[entity.getClassName()];
  }

  private updateIdsStore(entity: Entity): void {
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
}