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
  myDate: Date;
  message: string;
  constructor(private afauth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }
  login(user: UserA) {
    this.myDate = new Date();
    console.log(this.myDate.toString().substring(0, 3));
    if (this.myDate.toString().substring(0, 3) == 'Mon' || this.myDate.toString().substring(0, 3) == 'Sun') {
      this.message='No ckeck in on weekends';
    }
    else {
      if(user.email.length>6 && user.password.length>4)
      {
      try {
        this.afauth.auth.signInWithEmailAndPassword(user.email, user.password)
          .then(() => { this.navCtrl.setRoot(HomePage) }).catch((error) => { this.message = "Invalid login" });

      }
      catch (e) {
        console.error();
        this.message = "An error occured";
      }
    }
    else
    {
      this.message = "Invalid supply email length must be > 6 and password must be >4";
    }
    }
  }

register(){
  this.navCtrl.push(RegisterPage);
}

}
