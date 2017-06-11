import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MainService } from '../../providers/main';
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
  products: Array<any> = []; 
  searchText:string = "";  
  constructor(private mainService: MainService, private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  	if(this.navParams.get('search')['by'] == 'voice'){
  		this.searchByText(this.navParams.get('search')['text']);
      this.searchText = this.navParams.get('search')['text']
  	}else{
  		this.searchByBarcode(this.navParams.get('search')['barcode']);
      this.searchText = "Barcode: " + this.navParams.get('search')['barcode'];
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
    this.mainService.searchByWord(text).then( obs =>{
      obs.subscribe(products => {
          console.log(products);
          this.products = products;
        })
       }
      );
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
  onSearch(search){
    console.log(search['text'])
    if(search['text'].length>0){
      if(search['by'] == 'voice'){
        this.searchByText(search['text']);
        this.searchText = search['text']
      }else{
        this.searchByBarcode(search['barcode']);
        this.searchText = "Barcode: " + search['barcode'];
      }
    }
  }
}
