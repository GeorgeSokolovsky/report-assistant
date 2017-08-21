import { Entity } from './entity';

export class Clothes extends Entity {
  public siz: number;

  constructor(params?: object) {
    super(params);
  }
}
