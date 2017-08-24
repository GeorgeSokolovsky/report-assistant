import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EntitiesStorage } from '../services/entities.storage.service';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { routes } from './app.routes';
import { CreateModule } from './create/create.module';

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ComponentsModule,
    CreateModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [ AppComponent ],
  providers: [ EntitiesStorage],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
