import { Entity } from '../src/models/Entity';
import { Cloth } from '../src/models/Cloth';
import { Employee } from '../src/models/Employee';

export const config = {
  path: {
    cloth: 'examples/ex.csv',
    employee: 'examples/ex.csv'
  },
  collections: {
    cloth: 'cloth',
    employee: 'employee'
  },
  classes: {
    entity: Entity,
    cloth: Cloth,
    employee: Employee
  },
  name: {
    entity: 'entity',
    cloth: 'cloth',
    employee: 'employee'
  }
};