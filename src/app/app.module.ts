import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EntitiesStorage } from '../services/entities.store.service';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ComponentsModule
  ],
  entryComponents: [ AppComponent ],
  providers: [ EntitiesStorage],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
