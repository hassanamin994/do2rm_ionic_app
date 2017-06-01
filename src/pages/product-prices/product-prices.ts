import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductPrices page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-prices',
  templateUrl: 'product-prices.html',
})
export class ProductPrices {
  @Input() prices;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  confirmPrice(id: any){
  	console.log(id, 'confirm');
  	
  }
  fakePrice(id: any){
  	console.log(id,'fake');
  	
  }
}
