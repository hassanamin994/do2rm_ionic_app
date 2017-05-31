import { Input, Component } from '@angular/core';
import { ModalController, ViewController, NavController, NavParams } from 'ionic-angular';
import { PriceModal } from './price-modal/price-modal'
/**
 * Generated class for the ProductDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {
  @Input() product: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails');
  }

  addPrice(){
  	console.log('add price',this.product.id);
	   let modal = this.modalCtrl.create(PriceModal, {product_id: this.product.id});
	    modal.present();
  }

}
