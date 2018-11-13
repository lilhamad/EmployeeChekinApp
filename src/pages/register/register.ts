import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserA } from '../../app/user';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

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
  message: string;

  constructor(public navCtrl: NavController, private afauth: AngularFireAuth, public navParams: NavParams) {
  }

  async register(user: UserA) {
    try {
      if (user.email != null && user.password != null) {
        if (user.email.length > 6 && user.password.length > 4) {
          const result = this.afauth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
          console.log(result);
          if (new Date().toString().substring(0, 3) == 'Sat' || new Date().toString().substring(0, 3) == 'Sun') {
            this.message = 'No ckeck in on weekends';
          }
          else 
          {
            try {
              this.afauth.auth.signInWithEmailAndPassword(user.email, user.password)
                .then(() => { this.message = "login in..."; this.navCtrl.setRoot(HomePage) }).catch((error) => { this.message = "login in..."; });
            }
            catch (e) {
              console.error();
              this.message = "An error occured";
            }
          }
          // this.navCtrl.push(LoginPage);
        }
        else {
          this.message = "Invalid supply email length must be > 6 and password must be >4";
        }

      }
      else {
        this.message = "Empty field not allowed";
      }
    }
    catch (e) {
      console.error();

    }
  }

}
