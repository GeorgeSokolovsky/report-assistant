import { Employee } from '../models/employee';
import { Clothes } from '../models/clothes';
import * as moment from 'moment';

moment.locale('ru');

export const defaultEntities = {
  employee: [
    new Employee({id: 1, fio: 'Пушкин Александр Сергеевич', height: 180, size: 48, shoe: 42}),
    new Employee({id: 2, fio: 'Михаил Юрьевич Лермонтов', height: 193, size: 54, shoe: 45}),
    new Employee({id: 3, fio: 'Булгаков Михаил Афанасьевич', height: 192, size: 52, shoe: 44}),
    new Employee({id: 4, fio: 'Николай Васильевич Гоголь', height: 178, size: 46, shoe: 41}),
  ],
  clothes: [
    new Clothes({id: 1, name: 'Роба', siz: 123123123}),
    new Clothes({id: 2, name: 'Боты', siz: 876543210}),
    new Clothes({id: 3, name: 'Прихватка', siz: 123765412}),
  ],
  application: []
};

defaultEntities.application = [
  {
    id: 1,
    employeeId: defaultEntities.employee[0].id,
    date: moment('03.01.2016'),
    clothesSiz: defaultEntities.clothes[0].siz
  },
  {
    id: 2,
    employeeId: defaultEntities.employee[2].id,
    date: moment('05.01.2016'),
    clothesSiz: defaultEntities.clothes[1].siz
  },
  {
    id: 3,
    employeeId: defaultEntities.employee[1].id,
    date: moment('06.01.2016'),
    clothesSiz: defaultEntities.clothes[2].siz
  }
];
