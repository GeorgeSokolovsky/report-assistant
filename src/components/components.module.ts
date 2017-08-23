import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  imports: [MenuModule, HeaderModule],
  exports: [MenuModule, HeaderModule]
})
export class ComponentsModule {}
