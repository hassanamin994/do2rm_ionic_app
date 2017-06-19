import {Input, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { MainService } from '../../providers/main';
import { Observable } from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
import { UserPage } from '../user/user';

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
  @Input() details: any;
  user_id = "";
  constructor(private alertCtrl: AlertController , private mainService: MainService, public navCtrl: NavController, public navParams: NavParams) {
    mainService.getUserid().then(id => {
      this.user_id = id;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCard');
    console.log(this.product);
    
  }
  
  doConfirm(){
    this.mainService.confirmPrice(this.product.details.min_id.$oid)
    .then(obs => {

      obs.catch(e => {
        return  Observable.throw( 'error confirming') ;
      })
      .subscribe(res => {
        if(res.error)
           this.showAlert('Unsuccessful action!', res.error);
        else{
          // this.product.prices[0].confirmation_ids.push(this.user_id);
          this.showAlert('Success', res.message);
          this.toggleUserConfirm()
        }
      })

    })
  	
  }

  doFake(){
  	this.mainService.disconfirmPrice(this.product.details.min_id.$oid)
    .then(obs => {

      obs.catch(e => {
        return  Observable.throw( 'error confirming') ;
      })
      .subscribe(res => {
        if(res.error)
           this.showAlert('Disconfirmation Failed', res.error);
        else{
          // this.product.prices[0].disconfirmation_ids.push(this.user_id);
          this.showAlert('Disconfirmed Successfull', 'Disconfirmation Successfully');
          this.toggleUserDisconfirm();  
        }
      })

    })
  }
  toggleUserConfirm(){
    let user_index_in_confirms = this.product.details.min_confirmations.map(dis => dis.$oid ).indexOf(this.user_id);
    if(user_index_in_confirms == -1){
      this.product.details.min_confirmations.push({$oid: this.user_id})
      let user_index_in_disconfirms = this.product.details.min_disconfirmations.map(dis => dis.$oid ).indexOf(this.user_id);
      if(user_index_in_disconfirms != -1){
        this.product.details.min_disconfirmations.splice(user_index_in_disconfirms, 1)
      }
    }
    else
      this.product.details.min_confirmations.splice(user_index_in_confirms, 1)
  }

  toggleUserDisconfirm(){
    let user_index_in_disconfirms = this.product.details.min_disconfirmations.map(dis => dis.$oid ).indexOf(this.user_id);
    if(user_index_in_disconfirms == -1){
      this.product.details.min_disconfirmations.push({$oid: this.user_id})
      let user_index_in_confirms = this.product.details.min_confirmations.map(dis => dis.$oid ).indexOf(this.user_id);
      if(user_index_in_confirms != -1){
        this.product.details.min_confirmations.splice(user_index_in_confirms, 1)
      }
    }
    else
      this.product.details.min_disconfirmations.splice(user_index_in_disconfirms, 1)
  }
  openProductPage(){
    this.navCtrl.push(ProductPage, {product_id: this.product.id.$oid});
  }
  checkDidConfirm(){
    // get logged in user id and compare if his ids are in the confirmed array 
    return this.product.details? this.product.details.min_confirmations.map(obj => obj.$oid).indexOf(this.user_id) != -1 : false ;
  }
  checkDidDisconfirm(){
    // get logged in user id and compare if his ids are in the confirmed array 
      
    return this.product.details? this.product.details.min_disconfirmations.map(obj => obj.$oid).indexOf(this.user_id) != -1 : false ;
  }
  gotouser(id){
    this.navCtrl.push(UserPage,{id:id})
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
