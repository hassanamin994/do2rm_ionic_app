import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { MainService } from '../../providers/main';

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
  constructor(private mainService: MainService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Product');
    // get product from api by id
    let id = this.navParams.get('product_id');
    this.mainService.getProduct(id)
    .then( obs => {
      obs.subscribe(product => {
        console.log('product details', product)
        this.product = product;
      })
    })
  }
  
  logSegment(){
  	console.log(this.icons);
  	
  }

  onAddComment(comment: string){
    // make request to add comment here
    console.log(comment, 'from product ts ');
  }

}
