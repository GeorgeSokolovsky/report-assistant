import { Component, OnInit } from '@angular/core';
import { EntitiesStorage } from '../services/entities.store.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private storage: EntitiesStorage) {
  }

  public ngOnInit() {
    this.storage.loadAll().subscribe();
  }
}
