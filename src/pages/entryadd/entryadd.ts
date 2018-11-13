import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Entry } from '../../app/entry';
import { LoginPage } from '../login/login';
import { EntryPage } from '../entry/entry';


/**
 * Generated class for the EntryaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entryadd',
  templateUrl: 'entryadd.html',
})
export class EntryaddPage {
  entry = {} as Entry;
  message:string;
  constructor(private afauth: AngularFireAuth, private fbase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  add(entry1: Entry) {
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
      if(entry1.body != null)
      {
      this.entry.body = entry1.body;
      this.entry.userid = data.uid;
      this.entry.date = new Date().toDateString();
      this.fbase.list(`/entry/${data.uid}`).push(this.entry);
      this.navCtrl.push(EntryPage);
      }
      else
      {
        this.message = "You Can't submit empty entry."
      }
    });
  }

}
