import {Input, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { MainService } from '../../providers/main';
import { Observable } from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ProductCard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-card',
  templateUrl: 'product-card.html',
})
export class ProductCard {
  @Input() product: any;
  @Input() home: any;
  user_id = "593b8635a0444f00042950b0";
  constructor(private alertCtrl: AlertController , private mainService: MainService, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCard');
    console.log(this.product);
    
  }
  
  doConfirm(){
  	// console.log(id);
    console.log(this.product.id.$oid);
    this.mainService.confirmPrice(this.product.prices[0]._id.$oid)
    .then(obs => {

      obs.catch(e => {
        console.log('error confirming', e)
        return  Observable.throw( 'error confirming') ;
      })
      .subscribe(res => {
        if(res.error)
           this.showAlert('Confirmation Failed', res.error);
        else{
          this.product.prices[0].confirmation_ids.push(this.user_id);
          this.showAlert('Confirmation Successfull', 'Confirmation Successfully');
        
        }
        console.log('confirmed ', res);
      })

    })
  	
  }
  doFake(){
    console.log(this.product.id.$oid);
  	
  }

  openProductPage(){
    this.navCtrl.push(ProductPage, {id: this.product.id.$oid});
    console.log('open product id',this.product.id.$oid);
  }
  checkDidConfirm(){
    // get logged in user id and compare if his ids are in the confirmed array 
    return this.product.prices[0]? this.product.prices[0].confirmation_ids.indexOf(this.user_id) != -1 : false ;
  }
  checkDidDisconfirm(){
    // get logged in user id and compare if his ids are in the confirmed array 
      
    return this.product.prices[0]? this.product.prices[0].disconfirmation_ids.indexOf(this.user_id) != -1 : false ;
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
