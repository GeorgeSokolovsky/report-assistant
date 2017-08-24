import { Routes } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { ApplicationComponent } from './create/application/application.component';

export const routes: Routes = [
  {path: '', component: EmptyComponent},
  {
    path: 'create',
    children: [
      {path: 'application', component: ApplicationComponent}
    ]
  }
];
