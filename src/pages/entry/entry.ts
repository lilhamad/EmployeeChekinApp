import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { EntryaddPage } from '../entryadd/entryadd';

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
      });
    });
  }

  addentry(){
    this.navCtrl.push(EntryaddPage);
  }

}
