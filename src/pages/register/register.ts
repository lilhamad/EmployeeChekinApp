import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserA } from '../../app/user';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as UserA; 
  message:string;

  constructor(public navCtrl: NavController, private afauth: AngularFireAuth, public navParams: NavParams) {
  }

  async register(user:UserA){
    try{
      if(user.email.length>6 && user.password.length>4)
      {
      const result = this.afauth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.navCtrl.push(LoginPage);
      }
      else
    {
      this.message = "Invalid supply email length must be > 6 and password must be >4";
    }
    }
      catch(e){
        console.error();
        
    }
    }

}
