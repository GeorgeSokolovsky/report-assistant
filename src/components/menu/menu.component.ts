import { Component } from '@angular/core';

const CREATE_TAB_NAME = 'create';
const SHOW_TAB_NAME = 'show';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.template.html',
  styleUrls: ['menu.styles.scss']
})
export class MenuComponent {
  private tabsVisibility = {
    [CREATE_TAB_NAME]: false,
    [SHOW_TAB_NAME]: false
  };

  public toggleTab(tabName: string) {
    this.tabsVisibility[tabName] = !this.tabsVisibility[tabName];
  }

  public isTabElementsVisible(tabName: string): boolean {
    return this.tabsVisibility[tabName];
  }
}
