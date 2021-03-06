import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { EntryaddPage } from '../entryadd/entryadd';
import { Entry } from '../../app/entry';

/**
 * Generated class for the EntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {
  entries: object[] = [];
  message:string;
  disableButton;
  constructor(private afauth: AngularFireAuth, private fbase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afauth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        console.log("Logged in.");
      } else {
        console.log("Not logged in.");
        this.navCtrl.setRoot(LoginPage);
      }
    });
    this.afauth.authState.subscribe(data => {
      if (!data) {
        this.navCtrl.setRoot(LoginPage);
      }
      this.fbase.list(`/entry/${data.uid}`).valueChanges().subscribe(data => {
        this.entries = data;
        var result = data.filter(function (hero:Entry) {
          if (hero) {
            console.log(hero);
            if (hero.hasOwnProperty("date")) {
              if (hero.date) {
                return new Date(hero.date).toDateString() == new Date().toDateString();
              }
            } 
          }
        });
        console.log('result', result);
        if (result.length > 0) {
          this.disableButton = true;
        }
        if(data.length<1){this.message="No entries yet!"}
      });
    });

  }

  addentry() {
    this.navCtrl.push(EntryaddPage);
  }

  todaysentryonly() {
    this.afauth.auth.onAuthStateChanged(user => {
      this.fbase.list(`/entry/${user.uid}`).valueChanges().subscribe(entries => {
          var result = entries.filter(function (hero: Entry) {
            return new Date(hero.date).toDateString() == new Date().toDateString();
          });
          this.entries = result;
          if(result.length<1){this.message="No entries for today press the '+Entry' to add one."}
      });
    });

  }

}
