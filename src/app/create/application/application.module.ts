import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationComponent } from './application.component';
import {
  ApplicationsListComponent
} from './applications-list.component/applications-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ApplicationComponent, ApplicationsListComponent],
  exports: [ApplicationComponent]
})
export class ApplicationModule {
}
