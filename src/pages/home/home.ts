import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginPage } from '../login/login';
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
  checkin = {} as Checkin;
  constructor(private afauth: AngularFireAuth, private fbase: AngularFireDatabase, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    // this.fbase.list("/chekin").valueChanges().subscribe(_data => {
    //   this.data =  _data;
    //   console.log(this.data);
    // })
  }

  ionViewDidLoad() {

    this.afauth.auth.onAuthStateChanged(user => {
      if (user){
        console.log("Logged in.");
        // this.navCtrl.setRoot(HomePage);
      } else {
        console.log("Not logged in.");
        this.navCtrl.setRoot(LoginPage);
      }
    });
    this.afauth.authState.subscribe(data => {
      if (!data) {
        this.navCtrl.setRoot(LoginPage);
      }
      // console.log(data.metadata.lastSignInTime);
      // console.log(slice(data.metadata.lastSignInTime));
      try{
      this.checkin.date = data.metadata.lastSignInTime;
      this.checkin.userid = data.uid;
      this.fbase.list(`/chekin/${data.uid}`).push(this.checkin);
      this.fbase.list(`/chekin/${data.uid}`).valueChanges().subscribe(data => {
        this.checkindata = data;
      });
      // this.myDate = new Date("2011-09-25 EDT");
      this.myDate = new Date();
      console.log(this.myDate.toString().substring(0, 4));
      // this.afAuth.auth.signOut();
    }
    catch(e){
      console.error();
      this.navCtrl.setRoot(LoginPage);
    }
    });

  }

}
