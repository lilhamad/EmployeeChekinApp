import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Settings } from '../providers';

@Component({
  selector: 'app-root',
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar) {
    platform.ready().then(() => {
      // this.statusBar.hide();
      this.rootPage = LoginPage;
    });
  }

}
