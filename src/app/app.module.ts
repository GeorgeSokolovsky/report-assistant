import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EntitiesStorage } from '../services/entities.storage.service';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { routes } from './app.routes';
import { CreateModule } from './create/create.module';
import { ShowModule } from './show/show.module';

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ComponentsModule,
    CreateModule,
    ShowModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  entryComponents: [ AppComponent ],
  providers: [ EntitiesStorage],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
