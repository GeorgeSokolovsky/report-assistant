import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntitiesStorage } from '../../../services/entities.storage.service';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: 'employee.template.html'
})
export class EmployeeComponent implements OnInit {
  public employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private storage: EntitiesStorage) {
  }

  public ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      fio: ['', Validators.required],
      height: ['', Validators.required],
      size: ['', Validators.required],
      shoe: ['', Validators.required]
    });
  }

  public createEmployee() {
    this.storage.saveEmployee(new Employee(this.employeeForm.value));

    this.employeeForm.reset();
  }
}
