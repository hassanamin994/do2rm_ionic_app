import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { PriceModal } from '../product-details/price-modal/price-modal'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {MainService} from '../../providers/main'
import {Observable} from 'rxjs/Rx';

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
  product: any = {name: "", qr_code: ""} ;
  error: string = "" ;
  constructor(public mainSrv:MainService, private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductNewPage');
  }

  addProduct(){
  	console.log(this.product.name);
  	// add product to api and get its id 
    if(this.product.name.trim()){
      this.mainSrv.addProduct(this.product)
      .then((obs)=>{
        obs
        .catch((error:any)=>{
            console.log( error);
            this.error= error._body;
            return  Observable.throw( 'Duplicte product name error')}

          )
        .subscribe((data) => {
          let modal = this.modalCtrl.create(PriceModal, {product_id: data.id.$oid});
          modal.present();
          console.log(data);
        })
      })
    }

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
