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
  start: number = 0;
  end: number = 5; 
  offset = 5;
  constructor(private alertCtrl: AlertController, private mainService: MainService, private speechRecognition: SpeechRecognition, private Ctrl: AlertController, public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public loadingCtrl: LoadingController) {
    menuCtrl.enable(true);  menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad Home');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    // loading.present();
    this.mainService.getProducts(this.start, this.end).then(obs =>{
      obs
      .subscribe(products => {
        this.start = this.end +1;
        this.end = this.end + this.offset;
        console.log('products on init ',products);
        this.products = products;
        // loading.dismiss()
      })
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.start = 0;
    this.end = 5;
    this.products = [];
    this.loadMoreProducts(refresher);
  }

  loadMoreProducts(refresher){
    console.log('loading more products');
    this.mainService.getProducts(this.start,this.end).then(obs =>{
      obs
      .subscribe(products => {
        this.start = this.end +1;
        this.end = this.end + this.offset;
        console.log(products);
        this.insertProductsToArray(products);
        if(refresher)
          refresher.complete();
      })
    })
  }

  addProduct(){
    this.navCtrl.push(ProductNewPage);
  }

  insertProductsToArray(products) {
    // if it's an array, insert all elements 
    if(products.constructor == Array){
      products.forEach(product => {
        this.products.push(product);
      })
    } else {
    // if single element, just push 
      console.log('pushing single', products)
      if(products.status && products.status == 'no Results found') {
        console.log('no more products to load ');
        // show alert that no more products to load 
        this.showAlert('End of products', 'No more products are available');
      } else {
        this.products.push(products);
      }
    }

  }

   showAlert(heading, body){
      let alert = this.alertCtrl.create({
        title: heading,
        subTitle: body,
        buttons: ['Ok']
        });
      alert.present();
    }
    

}
