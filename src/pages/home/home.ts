import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { EntryPage } from '../entry/entry';
import { Checkin } from '../../app/checkin';
import { TruncateModule } from 'ng2-truncate';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  checkindata: object[] = [];
  a;
  myDate: Date;
  lastlogindate: string;
  lastloginmonth: string;
  todaysdate: string;
  todaysmonth: string;
  checkin = {} as Checkin;
  messagelastsignin:string;
  lastsignin:string;
  email:string;
  constructor(private afauth: AngularFireAuth, private fbase: AngularFireDatabase, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {

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
      this.email = data.email;

      console.log('last login on', data.metadata.lastSignInTime);
      this.myDate = new Date();
      this.lastsignin = data.metadata.lastSignInTime;
      this.lastlogindate = data.metadata.lastSignInTime.toString().substring(5, 7);
      this.lastloginmonth = data.metadata.lastSignInTime.toString().substring(8, 11);
      this.todaysmonth = this.myDate.toString().substring(4, 7);
      this.todaysdate = this.myDate.toString().substring(8, 10);
      try {
        if(this.lastlogindate==this.todaysdate && this.lastloginmonth==this.todaysmonth){
          this.messagelastsignin = "You've checked in for today "+this.lastsignin;
          // console.log("Checked in already");
        }
        else
        {
          this.checkin.date = data.metadata.lastSignInTime;
          this.checkin.userid = data.uid;
          this.fbase.list(`/chekin/${data.uid}`).push(this.checkin);
        }
        this.fbase.list(`/chekin/${data.uid}`).valueChanges().subscribe(data => {
          this.checkindata = data;
        });
      }
      catch (e) {
        console.error();
        // this.navCtrl.setRoot(LoginPage);
      }
    });

  }

  entry(){
    this.navCtrl.push(EntryPage);
  }
}
