import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Employee } from '../../../models/employee';
import { EntitiesStorage } from '../../../services/entities.storage.service';
import { months } from '../../../services/months';
import * as moment from 'moment';
import { Application } from '../../../models/application';

@Component({
  selector: 'app-create-application',
  templateUrl: 'application.template.html',
  styleUrls: ['application.styles.scss']
})
export class ApplicationComponent implements OnInit {
  public applications = [];
  public months = months;
  public employees: Employee[];
  private applicationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private storage: EntitiesStorage) {
  }

  public ngOnInit() {
    this.applicationForm = this.formBuilder.group({
      employee: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      siz: ['', Validators.required]
    });

    this.employees = this.storage.getEmployees();
  }

  public addApplication() {
    const {employee, month, year, siz} = this.applicationForm.value;

    const applications = _.map(employee, emp => {
      const applicationData = {
        employeeId: Number(emp),
        date: moment(`${month}.01.${year}`),
        clothesSiz: Number(siz)
      };

      return new Application(applicationData);
    });

    this.applications = this.applications.concat(applications);
  }

  public removeApplication(applicationId: number) {
    _.remove(this.applications, ['id', applicationId]);

    this.storage.removeApplication(applicationId);
  }

  public hasError(fieldName: string): boolean {
    const {errors, dirty, touched} = this.applicationForm.get(fieldName);

    return errors && dirty && touched && !!_(errors).keys().size();
  }
}
