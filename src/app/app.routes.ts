import { Routes } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { ApplicationComponent } from './create/application/application.component';
import { EmployeeComponent } from './create/employee/employee.component';
import { ClothesComponent } from './create/clothes/clothes.component';

export const routes: Routes = [
  {path: '', component: EmptyComponent},
  {
    path: 'create',
    children: [
      {path: 'application', component: ApplicationComponent},
      {path: 'employee', component: EmployeeComponent},
      {path: 'clothes', component: ClothesComponent}
    ]
  }
];
