import { Entity } from './entity';

export class Employee extends Entity {
  public fio: string;
  public height: string;
  public size: number;
  public shoe: number;

  constructor(params?: object) {
    super(params);
  }
}
