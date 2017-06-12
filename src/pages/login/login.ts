import { Component } from '@angular/core';
import {  NavController, NavParams , Loading ,LoadingController,MenuController  } from 'ionic-angular';
import {HomePage} from '../home/home'
import {MainService} from '../../providers/main'
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Rx';
import { RegistrationPage } from '../registration/registration';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector:'page-login',
  templateUrl: 'login.html',
  providers: [MainService]
})
export class LoginPage {
	loading: Loading;
	loginCredentials = { email:'' ,password:''};
	error:any=null

  constructor(public storage: Storage,public MainSrv:MainService,public menuCtrl:MenuController,public nav: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	menuCtrl.enable(false)
  	if(navParams.get('error'))
  		this.error=navParams.get('error');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  public login() {
    this.showLoading()
    
   this.MainSrv.login({auth:this.loginCredentials})
    .catch((error:any)=>{this.loading.dismiss();console.log(JSON.stringify(error) || error);this.error="*wrong email or password";return  Observable.throw( 'Server error')})
    .subscribe((data)=>{
      console.log(JSON.stringify(data) || data)
    	this.loading.dismiss()
    	this.storage.set('token','Bearer '+data['token']);
    	this.nav.setRoot(HomePage);
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }



  register(){
    this.nav.push(RegistrationPage)
  }
 

}
