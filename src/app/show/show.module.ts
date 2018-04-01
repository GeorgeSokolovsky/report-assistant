import { NgModule } from '@angular/core';
import { ClothesListModule } from './clothes/clothes-list.module';

@NgModule({
    imports: [ClothesListModule],
    exports: [ClothesListModule]
})
export class ShowModule {
}