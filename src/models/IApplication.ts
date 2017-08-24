import * as moment from 'moment';
import { Employee } from './employee';
import { Clothes } from './clothes';

export interface IApplication {
  id: number;
  employeeId: number;
  clothesSiz: number;
  date: moment.Moment;
}

export interface IApplicationView {
  id: number;
  employee: Employee;
  clothes: Clothes;
  date: string;
}
