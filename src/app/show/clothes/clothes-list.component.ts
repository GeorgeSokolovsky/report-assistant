import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EntitiesStorage } from '../../../services/entities.storage.service';
import { Clothes } from '../../../models/clothes';
import * as _ from 'lodash';

@Component({
    selector: 'clothes-list',
    templateUrl: 'clothes.template.html'
})
export class ClothesListComponent implements OnInit {
    clothesList: Clothes[];

    constructor(private storage: EntitiesStorage,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.storage.loadClothes()
            .subscribe(clothes => {
                this.clothesList = clothes;
                this.changeDetectorRef.detectChanges();
            });
    }

    removeClothes(clothes: Clothes) {
        // todo implement
        _.remove(this.clothesList, clothes);
        this.changeDetectorRef.detectChanges();
    }
}