import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [EmployeeComponent],
  exports: [EmployeeComponent]
})
export class EmployeeModule {
}
