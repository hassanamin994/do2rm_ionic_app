import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainService } from '../../providers/main';

/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  user: any = {
  	id: 1,
  	username: 'Hassan Amin',
  	imageUrl: 'https://dummyimage.com/600x400/000/fff',
    points: 100,
    badges:[{name: 'badge 1', imageUrl: 'https://dummyimage.com/600x400/000/fff'},{name: 'badge 1', imageUrl: 'https://dummyimage.com/600x400/000/fff'}]
  }
  constructor(private mainService: MainService, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.mainService.getUserInfo().then(obs => {
      obs.subscribe(user => {
        console.log('user data ', user)
        this.user = user; 
      })
    })
  }


}
