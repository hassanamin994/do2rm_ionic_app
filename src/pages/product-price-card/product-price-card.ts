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
  user_id = '';
  constructor(private alertCtrl: AlertController, private mainService: MainService, public navCtrl: NavController, public navParams: NavParams) {
  mainService.getUserid().then(id => {
      this.user_id = id;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPriceCardPage');
  }
  confirmPrice(id: any){

  	this.mainService.confirmPrice(id)
    .then( obs => {
      obs.subscribe( res => {
        console.log(res);
        this.refreshPrice();
        this.showAlert('Confirmation', res.message? res.message : res.error);
      })
    })
  }
  fakePrice(id: any){
  	console.log(id,'fake');
  	this.mainService.disconfirmPrice(id)
    .then( obs => {
      obs.subscribe( res => {
        console.log(res);
        this.refreshPrice();
        this.showAlert('Disconfirm', res.message? res.message : res.error);
      })
    })
  }

  refreshPrice(){
    console.log('old price', this.price);
    this.mainService.getPrice(this.price.id.$oid).then( obs => {
      obs.subscribe(price => {
        this.price = price;
        console.log('new price', this.price);
      })
    });
  }
  showAlert(heading, body){
      let alert = this.alertCtrl.create({
        title: heading,
        subTitle: body,
        buttons: ['Dismiss']
        });
      alert.present();
    }
    checkDidConfirm(){
      return this.price.confirmation_ids.map(id => id.$oid).indexOf(this.user_id) != -1 
    }
    checkDidDisconfirm(){
      return this.price.disconfirmation_ids.map(id => id.$oid).indexOf(this.user_id) != -1 
    }

}
