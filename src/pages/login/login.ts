import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { UserA } from '../../app/user';
import { AngularFireDatabase } from 'angularfire2/database';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as UserA;
  constructor( private afauth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }
  async login(user: UserA){
    try{
      const result = this.afauth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result){
        this.navCtrl.setRoot(HomePage);
        
        // this.fbase.list("/checkin").push(result);
      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    }
      catch(e){
        console.error();
        this.navCtrl.setRoot(LoginPage);
        
    }
  }

  ionViewDidLoad() {
    console.log('loaded');
    this.afauth.authState.subscribe(data => {
      if(data){
        data = data;
        this.navCtrl.setRoot(HomePage);
      }
      else{
        // this.navCtrl.setRoot(LoginPage);
      }
    });
    // return this.data;
    
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
