import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Loading, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { MainService } from '../../providers/main'  ;
import { ProductNewPage } from '../product-new/product-new';

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  products: Array<any> = [];
  constructor(private mainService: MainService, private speechRecognition: SpeechRecognition, private Ctrl: AlertController, public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public loadingCtrl: LoadingController) {
    menuCtrl.enable(true);  menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad Home');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    // loading.present();
    this.mainService.getProducts().then(obs =>{
      obs
      .subscribe(products => {
        console.log(products);
        this.products = products;
        // loading.dismiss()
      })
    })
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.mainService.getProducts().then(obs =>{
      obs
      .subscribe(products => {
        console.log(products);
        this.products = products;
        refresher.complete();
      })
    })
  }

  addProduct(){
    this.navCtrl.push(ProductNewPage);
  }

  
  

}
