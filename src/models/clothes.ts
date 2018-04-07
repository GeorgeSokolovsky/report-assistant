import { Entity } from './entity';

export class Clothes extends Entity {
  static fields = ['name', 'siz', 'id'];

  name: number;
  siz: number;

  constructor(params?: object) {
    super(params);
  }
}
