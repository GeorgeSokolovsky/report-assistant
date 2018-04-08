import './polyfills';
import './vendor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { DB } from './db/DB';

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => DB.init());
