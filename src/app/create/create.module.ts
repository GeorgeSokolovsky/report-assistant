import { NgModule } from '@angular/core';
import { ApplicationModule } from './application/application.module';
import { EmployeeModule } from './employee/employee.module';
import { ClothesModule } from './clothes/clothes.module';

@NgModule({
  imports: [ApplicationModule, EmployeeModule, ClothesModule],
  exports: [ApplicationModule, EmployeeModule, ClothesModule]
})
export class CreateModule {
}
