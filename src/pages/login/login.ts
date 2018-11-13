import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
// import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { UserA } from '../../app/user';
// import { AngularFireDatabase } from 'angularfire2/database';

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
    if (this.myDate.toString().substring(0, 3) == 'Sat' || this.myDate.toString().substring(0, 3) == 'Sun') {
      this.message = 'No ckeck in on weekends';
    }
    else 
    {
      if (user.email != null && user.password != null) {
        try {
          this.afauth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(() => { this.navCtrl.setRoot(HomePage) }).catch((error) => { this.message = "Invalid login" });

        }
        catch (e) {
          console.error();
          this.message = "An error occured";
        }
      }
      else {
        this.message = "Empty form not allowed";
      }
    }

  }

register(){
  this.navCtrl.push(RegisterPage);
}

}
