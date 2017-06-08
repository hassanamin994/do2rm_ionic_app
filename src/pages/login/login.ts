import { Component } from '@angular/core';
import {  NavController, NavParams , Loading,LoadingController,MenuController	} from 'ionic-angular';
import {HomePage} from '../home/home'
import {MainService} from '../../providers/main'
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Rx';



@Component({
  selector:'page-login',
  templateUrl: 'login.html',
  providers: [MainService]
})
export class LoginPage {
	loading: Loading;
	loginCredentials = { _username: '', _password: '' };
	error:any=null

  constructor(public storage: Storage,public MainSrv:MainService,public menuCtrl:MenuController,public nav: NavController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	menuCtrl.enable(false)
  	if(navParams.get('error'))
  		this.error=navParams.get('error');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  public login() {
    this.showLoading()
    
    
   this.MainSrv.login(this.loginCredentials)
    .catch((error:any)=>{this.loading.dismiss();this.error='*wrong username or password';return  Observable.throw(error.json().error || 'Server error')})
    .subscribe((data)=>{
    	this.loading.dismiss()
    	this.storage.set('token','JWT '+data['token']);
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

}
