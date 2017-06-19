import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainService } from '../../providers/main';
import { UserEditPage } from '../user-edit/user-edit';

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
  	username: '',
  	imageUrl: 'https://dummyimage.com/600x400/000/fff',
    points: 0,
    badges:[{name: 'badge 1', imageUrl: 'https://dummyimage.com/600x400/000/fff'},{name: 'badge 1', imageUrl: 'https://dummyimage.com/600x400/000/fff'}]
  }
  badge: string

  constructor(private mainService: MainService, public navCtrl: NavController, public navParams: NavParams) {

  }
  editProfile() {
    this.navCtrl.push(UserEditPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.mainService.getUserInfo().then(obs => {
      obs.subscribe(user => {
        console.log('user data ', user)
        this.user = user; 
        switch (true) {
            case (user.points > 50 && user.points <= 100):
                this.badge='001.png'
                break;
            case (user.points > 100 && user.points <= 200):
                this.badge = '002.png'
                break;
            case (user.points > 200 && user.points <= 300):
                this.badge = '003.png'
                break;
            case (user.points > 300 && user.points <= 400):
                this.badge = '004.png'
                break;
            case (user.points > 400 && user.points <= 500):
                this.badge = '005.png'
                break;
            case (user.points > 500 && user.points <= 600):
                this.badge = '006.png'
                break;
            case (user.points > 600 ):
                this.badge = '007.png'
                break;
            default:
                break;
        }
      })
    })
  }


}
