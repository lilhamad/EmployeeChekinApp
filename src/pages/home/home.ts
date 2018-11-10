import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,AngularFireList   } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { Checkin } from '../../app/checkin';
// import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  checkindata: object[]= [];
  a;
  myDate:string;
  checkin = {} as Checkin;
  constructor(private afauth: AngularFireAuth, private fbase:AngularFireDatabase, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    // this.fbase.list("/chekin").valueChanges().subscribe(_data => {
    //   this.data =  _data;
    //   console.log(this.data);
    // })
  }

  ionViewDidLoad() {
    this.afauth.authState.subscribe(data => {
      if(!data){
        this.navCtrl.setRoot(LoginPage);
      }
      this.checkin.date=data.metadata.lastSignInTime;
      this.checkin.userid=data.uid;
      this.fbase.list(`/chekin/${data.uid}`).push(this.checkin);
      this.fbase.list(`/chekin/${data.uid}`).valueChanges().subscribe(data=>{
        this.checkindata = data;
      });
      this.myDate = new Date().toISOString();
      // this.afAuth.auth.signOut();
    });
    
  }

}
