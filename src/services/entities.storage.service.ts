import * as _ from 'lodash';
import { Injectable, NgZone } from '@angular/core';
import { config } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { Entity } from '../models/entity';
import { Clothes } from '../models/clothes';
import { Employee } from '../models/employee';
import { Application } from '../models/application';
import { DB } from '../db/DB';

const { join } = require('path');

@Injectable()
export class EntitiesStorage {
  private idsStore: {[className: string]: number} = {};
  private entitiesStore: {[collectionName: string]: Entity[]} = {};

  constructor(private zone: NgZone) {}

  loadAll(): Observable<[Clothes[], Employee[], Application[]]> {
    return Observable.zip(this.loadClothes(), this.loadEmployee(), this.loadApplications());
  }

  loadClothes(): Observable<Clothes[]> {
    return this.loadEntities<Clothes>(config.name.clothes)
      .do(clothes => this.entitiesStore[config.collections.clothes] = clothes)
      .do(clothes => this.updateIdsStore(_.last(clothes)));
  }

  loadEmployee(): Observable<Employee[]> {
    return this.loadEntities<Employee>(config.name.employee)
      .do(employees => this.entitiesStore[config.collections.employee] = employees)
      .do(employees => this.updateIdsStore(_.last(employees)));
  }

  loadApplications(): Observable<Application[]> {
    return this.loadEntities<Application>(config.name.application)
      .do(applications => this.entitiesStore[config.collections.application] = applications)
      .do(applications => this.updateIdsStore(_.last(applications)));
  }

  getCloth(siz: number): Clothes {
    const collectionName = _.get(config.collections, 'clothes');
    const collection = this.entitiesStore[collectionName] as Clothes[];

    return _.find(collection, {siz});
  }

  getEmployees(): Employee[] {
    return this.entitiesStore.employee as Employee[];
  }

  getEmployee(id: number): Employee {
    return this.getEntity(config.name.employee, id);
  }

  saveApplication(application: Application): Observable<Application> {
    const {collections} = config;

    return this.saveEntity<Application>(collections.application, application);
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    const {collections} = config;

    return this.saveEntity<Employee>(collections.employee, employee);
  }

  saveClothes(clothes: Clothes): Observable<Clothes> {
    const {collections} = config;

    return this.saveEntity<Clothes>(collections.clothes, clothes);
  }

  removeApplication(id: number) {
    const {application} = config.collections;

    _.remove(this.entitiesStore[application], {id});
  }

  private loadEntities<T extends Entity>(name: string): Observable<T[]> {
    const {path, classes} = config;
    const file = join(__dirname, _.get(path, name));
    const entityClass = _.get(classes, name, Entity);

    return DB.readFrom(file, entityClass);
  }

  private getEntity<T extends Entity>(name: string, id: number): T {
    const collectionName = _.get(config.collections, name);
    const collection = this.entitiesStore[collectionName];

    return _.find(collection, {id}) as T;
  }

  private saveEntity<T extends Entity>(collectionName: string, entity: T): Observable<T> {
    this.updateEntityId(entity);
    this.pushEntity(collectionName, entity);

    const entityClassName = entity.getClassName();
    const entities = this.entitiesStore[entityClassName] as T[];

    return this.zone.runOutsideAngular(() =>
        DB.writeTo<T>(`${__dirname}${config.path[entityClassName]}`, entities)
            .map(() => entity)
    );
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
}
