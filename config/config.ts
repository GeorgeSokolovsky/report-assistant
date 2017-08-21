import { Entity } from '../src/models/entity';
import { Clothes } from '../src/models/clothes';
import { Employee } from '../src/models/employee';

export const config = {
  path: {
    clothes: '/examples/ex.csv',
    employee: '/examples/ex.csv'
  },
  collections: {
    clothes: 'clothes',
    employee: 'employee'
  },
  classes: {
    entity: Entity,
    clothes: Clothes,
    employee: Employee
  },
  name: {
    entity: 'entity',
    clothes: 'clothes',
    employee: 'employee'
  }
};
