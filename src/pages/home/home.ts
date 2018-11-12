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
  date: Date;
  myDate: Date;
  lastlogindate: string;
  lastloginmonth: string;
  todaysdate: string;
  todaysmonth: string;
  checkin = {} as Checkin;
  messagelastsignin: string;
  lastsignin: string;
  email: string;
  datauserid: string;
  val: string;
  checkedin: false;
  // result: [];
  constructor(private afauth: AngularFireAuth, private fbase: AngularFireDatabase, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

    this.afauth.auth.onAuthStateChanged(data => {
      if (!data) {
        this.navCtrl.setRoot(LoginPage);
      }
      this.email = data.email;
      this.datauserid = data.uid;
      console.log('last login on', data.metadata.lastSignInTime);
      this.myDate = new Date();
      this.lastsignin = data.metadata.lastSignInTime;
      this.lastlogindate = data.metadata.lastSignInTime.toString().substring(5, 7);
      this.lastloginmonth = data.metadata.lastSignInTime.toString().substring(8, 11);
      this.todaysmonth = this.myDate.toString().substring(4, 7);
      this.todaysdate = this.myDate.toString().substring(8, 10);
      try {
        if (this.lastlogindate == this.todaysdate && this.lastloginmonth == this.todaysmonth) {
          this.messagelastsignin = "You've checked in for today " + this.lastsignin;
        }
      }
      catch (e) {
        console.error();
      }
      this.filterdata('');
    });

  }

  filterdata(ev) {
    // var vel = ev.target.value;
    this.fbase.list(`/chekin/${this.datauserid}`).valueChanges().subscribe(attendance => {
      if (attendance.length >= 1) {
        var result = attendance.filter(function (hero:Checkin) {

          if (hero.date) {
            // listresult.push(hero)
            return new Date(hero.date).toDateString().toLowerCase().includes(ev.toLowerCase());
          }
        })
        this.checkindata = result;
      }
      else { this.checkindata = []; }

    });

  }
  async logout(): Promise<any> {
    return this.afauth.auth.signOut();
  }
  entry() {
    this.navCtrl.push(EntryPage);
  }
}
