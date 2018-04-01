import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';
import { IApplication, IApplicationView } from '../../../../models/IApplication';
import { EntitiesStorage } from '../../../../services/entities.storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-applications-list',
  templateUrl: 'applications-list.template.html'
})
export class ApplicationsListComponent {
  @Output() public onRemove = new EventEmitter<number>();

  private _applications: IApplicationView[];

  constructor(private storage: EntitiesStorage) {
    moment.locale('ru');
  }

  @Input('applications') set applications(applications: IApplication[]) {
    this._applications = _.map(applications, app => ({
        id: app.id,
        employee: this.storage.getEmployee(app.employeeId),
        clothes: this.storage.getCloth(app.clothesSiz),
        date: moment(app.date).format('MMMM YYYY')
      })
    );
  }

  getApplications(): IApplicationView[] {
    return this._applications;
  }

  removeApplication(app: IApplicationView) {
    this.onRemove.emit(app.id);

    _.pull(this._applications, app);
  }
}
