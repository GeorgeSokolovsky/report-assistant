import { NgModule } from '@angular/core';
import { ApplicationModule } from './application/application.module';

@NgModule({
  imports: [ApplicationModule],
  exports: [ApplicationModule]
})
export class CreateModule {
}
