import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PriceModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-price-modal',
  templateUrl: 'price-modal.html',
})
export class PriceModal {
  price: number = 0 ; 
  location: string = "" ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceModal');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  getCurrentPosition(){

  }

  addPrice(){
  	console.log(this.price, this.location);
  	
  }
}
