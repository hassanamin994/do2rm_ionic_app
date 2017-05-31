import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Product page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  product: any = {};
  icons: any = "overview" ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Product');
    // get product from api by id
    let id = this.navParams.get('product_id');
    this.product = {  
      id:1,
      name:" Product 1 ",
      imageUrl:"https://dummyimage.com/600x400/000/fff",
      confirms: 15,
      fakes: 5
    }
    ;
  }
  
  logSegment(){
  	console.log(this.icons);
  	
  }

}
