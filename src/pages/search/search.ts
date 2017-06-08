import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular'
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  	this.showAlert('searched',JSON.stringify(this.navParams.get('search')));

  	if(this.navParams.get('search')['by'] == 'voice'){
  		this.searchByText(this.navParams.get('search')['text']);
  	}else{
  		this.searchByBarcode(this.navParams.get('search')['barcode'])
  	}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  searchByBarcode(barcode){
  	console.log(barcode)
  	// load products
  }

  searchByText(text){
  	console.log('searching by text');
  	// load products 
  }

	showAlert(heading, body){
		let alert = this.alertCtrl.create({
		  title: heading,
		  subTitle: body,
		  buttons: ['Dismiss']
		  });
		alert.present();
	}
}
