import { Entity } from './entity';

export class Clothes extends Entity {
  public name: number;
  public siz: number;

  constructor(params?: object) {
    super(params);
  }
}
