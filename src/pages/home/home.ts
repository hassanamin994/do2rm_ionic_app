import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';

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
  products: Array<any> = []
  constructor(private alertCtrl: AlertController, public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
    this.products = [
    {
    	id:1,
    	name:" Product 1 ",
    	imageUrl:"https://dummyimage.com/600x400/000/fff",
    	confirms: 15,
    	fakes: 5
    },{
    	id:2,
    	name:" Product 2 ",
    	imageUrl:"https://dummyimage.com/600x400/000/fff",
    	confirms: 5,
    	fakes: 9
    },{
    	id:3,
    	name:" Product 3 ",
    	imageUrl:"https://dummyimage.com/600x400/000/fff",
    	confirms: 10,
    	fakes: 3
    },

    ]
  }
  openBarcodeSearch(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
      console.log(barcodeData);
      let alert = this.alertCtrl.create({
        title: 'Barcode data',
        subTitle: JSON.stringify(barcodeData),
        buttons: ['Dismiss']
      });
      alert.present();
    }, (err) => {
      console.log(err);
        // An error occurred
        let alert = this.alertCtrl.create({
          title: 'Barcode err',
          subTitle: JSON.stringify(err),
          buttons: ['Dismiss']
        });
    });
  }


}
