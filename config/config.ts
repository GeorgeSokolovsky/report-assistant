import { Entity } from '../src/models/entity';
import { Clothes } from '../src/models/clothes';
import { Employee } from '../src/models/employee';
import { Application } from '../src/models/application';

export const config = {
  path: {
    clothes: '/data/clothes.csv',
    employee: '/data/employee.csv',
    application: '/data/application.csv'
  },
  collections: {
    clothes: 'clothes',
    employee: 'employee',
    application: 'application'
  },
  classes: {
    entity: Entity,
    clothes: Clothes,
    employee: Employee,
    application: Application
  },
  name: {
    entity: 'entity',
    clothes: 'clothes',
    employee: 'employee',
    application: 'application'
  }
};
