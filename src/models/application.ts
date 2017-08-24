import { Entity } from './entity';
import * as moment from 'moment';

export class Application extends Entity {
  public date: moment.Moment;
  public employeeId: number;
  public clothesSiz: number;

  constructor(params?: object) {
    super(params);
  }
}
