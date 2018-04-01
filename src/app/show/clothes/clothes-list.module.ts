import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClothesListComponent } from './clothes-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ClothesListComponent],
    exports: [ClothesListComponent]
})
export class ClothesListModule {
}