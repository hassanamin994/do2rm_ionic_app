import {Input, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductCard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-card',
  templateUrl: 'product-card.html',
})
export class ProductCard {
  @Input() product: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCard');
    console.log(this.product);
    
  }
  
  doConfirm(id: number){
  	console.log(id);
  	
  }
  doFake(id: number){
  	console.log(id);
  	
  }

}
