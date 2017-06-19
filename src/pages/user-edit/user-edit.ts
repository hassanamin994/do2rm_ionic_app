import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { MainService } from '../../providers/main';

/**
 * Generated class for the UserEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {
	user: any = { username: "", 
				password: "",
				password_confirmation: "",
				image: "",
		};
	errors: Array<any> = [] 
  constructor(private camera: Camera, 
  		private alertCtrl: AlertController, 
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		private mainService: MainService

  		){
  }

ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.mainService.getUserInfo().then(obs => {
      obs.subscribe(user => {
        console.log('user data ', user)
        this.user = user;
        this.user.username = user.username;
        this.user.image = user.avatar.url;
        this.user.id = user.id.$oid

      })
    })
  }
   updateUser() {
   	this.errors = [];
 	// verify errors and send request
   	if(!this.user.username)
   		this.errors.push("Username cannot be empty!")
   	if(this.user.password){
   		if(this.user.password != this.user.password_confirmation)
   			this.errors.push('Password confirmation doesn\'t match ')
   	}
   	if(this.errors.length == 0 ) {
   		if(this.user.image){
   			// if user added new image, include it to be updated
   			this.user.avatar = this.user.image;
	   		this.doUpdateRequest();
   		}
   	}

   }

   doUpdateRequest(){
   	this.mainService.updateUser(this.user)
   	.then(obs => {
   		obs.subscribe(res => {
   			console.log(res);
   		})
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
      this.user.image = base64Image;
    }, (err) => {
    // Handle error
    });

  }

}
