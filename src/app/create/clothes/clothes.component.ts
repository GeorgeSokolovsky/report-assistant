import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntitiesStorage } from '../../../services/entities.storage.service';
import { Clothes } from '../../../models/clothes';

@Component({
  selector: 'app-create-clothes',
  templateUrl: 'clothes.template.html'
})
export class ClothesComponent implements OnInit {
  public clothesForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private storage: EntitiesStorage) {
  }

  public ngOnInit() {
    this.clothesForm = this.formBuilder.group({
      name: ['', Validators.required],
      siz: ['', Validators.required]
    });
  }

  public createClothes() {
    this.storage.saveClothes(new Clothes(this.clothesForm.value));

    this.clothesForm.reset();
  }
}
