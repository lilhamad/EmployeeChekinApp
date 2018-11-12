import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Settings } from '../providers';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Checkin } from '../app/checkin';


@Component({
  selector: 'app-root',
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(private afauth: AngularFireAuth, private fbase: AngularFireDatabase, private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar) {
    platform.ready().then(() => {
      // this.statusBar.hide();
      this.afauth.auth.onAuthStateChanged(user => {
        if (user) {
          var myDate = new Date();
          var checko = this.fbase.list(`/chekin/${user.uid}`).valueChanges().subscribe(userdata => {
            if (userdata.length < 1) {
              var date = new Date().toString();
              var userid = user.uid;
              var shekins = { userid, date };
              this.fbase.list(`/chekin/${user.uid}`).push(shekins);
            }
            else if(userdata.length >= 1){
              var result = userdata.filter(function (hero:Checkin) {
                if (hero) {
                  console.log(hero);
                  if (hero.hasOwnProperty("date")) {
                    if (hero.date) {
                      return new Date(hero.date).toDateString() == new Date().toDateString();
                    }
                  } else { return []; }
                }
              });
              if (result.length == 0) {
                console.log('no result');
                var date = new Date().toString();
                var userid = user.uid;
                var shekins = { userid, date };
                this.fbase.list(`/chekin/${user.uid}`).push(shekins);
              }
              this.rootPage = HomePage;
            }
          });
        }
        else {
          console.log("Not logged in.");
          this.rootPage = LoginPage;
        }
      });

    });
  }

}
