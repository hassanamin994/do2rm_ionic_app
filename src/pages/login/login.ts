import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { APIRoutes } from '../../API.routes';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import { AuthenticationService } from '../../authentication.service';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {
  	email: "",
  	password: ""
  };
  error: string = "" ;
  constructor(private authenticationService: AuthenticationService, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
  	if(this.user.email.trim() && this.user.password.trim()){

  		this.getAccessToken();

  	}else{
  		this.error = "Please enter email and password";
  	}
  }
  register(){
    this.navCtrl.push(RegistrationPage)
  }
  private getAccessToken(){
  	this.http.post(APIRoutes.get_login_route(),this.user).subscribe(res => {
  		console.log(res);
      // if success, open application.
      // this.navCtrl.setRoot(HomePage)
      // else show error message
  	})
    // this.authenticationService.login('asdasdasdasdas',{username:"hassan"})
    // this.navCtrl.setRoot(HomePage)
    
  }

}
