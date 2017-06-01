import { Component } from '@angular/core';
import { AlertController, ViewController, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps'
/**
 * Generated class for the PriceModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-price-modal',
  templateUrl: 'price-modal.html',
})
export class PriceModal {
  price: number = 0 ; 
  location: string = "" ;
  constructor(public googleMaps: GoogleMaps, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
     
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceModal');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  getCurrentPosition(){

  }

  addPrice(){
  	console.log(this.price, this.location);
  	
  }

  loadMap(){

    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element);
    // map.
    // map.getMyLocation(location =>{
    //   map.addMarker({
    //     'position': location.latLng
    //   })
    // })

    // navigator
    let options = {
       enableHighAccuracy:true
     };

    navigator.geolocation.getCurrentPosition((position)=>{

      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: JSON.stringify(position),
        buttons: ['OK']
      });
      
      alert.present();

    },(err) => {

        let alert = this.alertCtrl.create({
        title: 'Fail!',
        subTitle: JSON.stringify(err),
        buttons: ['OK']
      });
      alert.present();

    } ,options);
    

  }

}
