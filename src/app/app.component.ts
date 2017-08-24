import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EntitiesStorage } from '../services/entities.storage.service'

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AppComponent implements OnInit {
  constructor(private storage: EntitiesStorage) {
  }

  public ngOnInit() {
    this.storage.loadAll().subscribe();
  }
}
