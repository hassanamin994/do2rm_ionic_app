import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { PriceModal } from '../product-details/price-modal/price-modal'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ProductNewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-new',
  templateUrl: 'product-new.html',
})
export class ProductNewPage {
  product: any = {name: "", barcode: ""} ;
  constructor(private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductNewPage');
  }

  addProduct(){
  	console.log(this.product.name);
  	// add product to api and get its id 

  	let modal = this.modalCtrl.create(PriceModal, {product_id: this.product.name});
    modal.present();
  }
  openBarcodeSearch(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     if(!barcodeData.cancelled){
     	this.product.barcode = barcodeData.text;
     }
    }, (err) => {
        // An error occurred
        console.log(err);
        // this.showAlert('barcode error', JSON.stringify(err));
    });
  }

}
