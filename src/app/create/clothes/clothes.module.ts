import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClothesComponent } from './clothes.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [ClothesComponent],
  exports: [ClothesComponent]
})
export class ClothesModule {
}
