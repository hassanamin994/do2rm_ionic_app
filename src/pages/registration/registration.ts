import { Component } from '@angular/core';
import { NavController, NavParams ,Loading,LoadingController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {MainService} from '../../providers/main';
import { LoginPage } from '../login/login';
import {Observable} from 'rxjs/Rx';





/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [MainService]
})
export class RegistrationPage {
  newuser: any = { email:'' ,password:'',password_confirmation:"",username:""};
  error:any=null
  loading: Loading;

  constructor(public MainSrv:MainService, private camera: Camera, private fb: Facebook,public nav: NavController, private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  register(){
   this.showLoading()
   this.MainSrv.register({user:this.newuser})
    .catch((error:any)=>{this.loading.dismiss();console.log(JSON.stringify(error) || error);this.error=JSON.stringify(error) || error;return  Observable.throw(error.json().error || 'Server error')})
    .subscribe((data)=>{
      this.loading.dismiss()
      console.log(JSON.stringify(data))
      this.nav.setRoot(LoginPage);
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  registerFacebook(){
  	this.fb.login(['public_profile', 'user_friends', 'email'])
  	.then((res: FacebookLoginResponse) =>{
  		let alrt = this.alertCtrl.create({
  			title: "Facebook Login",
  			subTitle: JSON.stringify(res),
  			buttons: ['Dismiss']
  		})

  		alrt.present();
  	}).catch(e => {
  		let alrt = this.alertCtrl.create({
  			title: "Facebook Error",
  			subTitle: JSON.stringify(e),
  			buttons: ['Dismiss']
  		})

  		alrt.present();
  	})
  }

  selectImage(){
    console.log('selecting image');
    let alert = this.alertCtrl.create();
    alert.setTitle('Import Image');
    alert.addInput({
      type: 'radio',
      label: 'Gallery',
      value: 'gallary',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Camera',
      value: 'camera',
      checked: false
    });

    alert.addButton({
      text: 'OK',
      handler: data => {
        this.openImageSelector(data);
        console.log(data);
      }
    });
    alert.present();
  	
  }

  openImageSelector(choice){
    if(choice === 'camera'){
      var sourceType = this.camera.PictureSourceType.CAMERA ;
      console.log('camer chaoice ')
    }
    else{
      console.log('gallary  ')
      var sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    }

    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.newuser.image = base64Image;
    }, (err) => {
    // Handle error
    });

  }
  login(){
    this.navCtrl.push(LoginPage)
  }

}
