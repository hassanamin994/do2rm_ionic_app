import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainService } from '../../providers/main';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ProductPriceCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-price-card',
  templateUrl: 'product-price-card.html',
})
export class ProductPriceCardPage {
  @Input() price: any;
  constructor(private alertCtrl: AlertController, private mainService: MainService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPriceCardPage');
  }
  confirmPrice(id: any){
  	console.log(id, 'confirm');
  	this.mainService.confirmPrice(id)
    .then( obs => {
      obs.subscribe( res => {
        console.log(res);
        this.showAlert('Confirmation', res.message);
      })
    })
  }
  fakePrice(id: any){
  	console.log(id,'fake');
  	
  }

  refreshPrices(){

  }
  showAlert(heading, body){
      let alert = this.alertCtrl.create({
        title: heading,
        subTitle: body,
        buttons: ['Dismiss']
        });
      alert.present();
    }

}
