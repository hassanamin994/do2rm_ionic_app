import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ViewController, NavController, NavParams } from 'ionic-angular';
declare var google;

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
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  price: number = 0 ;
  location: string = "" ;
  constructor( public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {


  }

  ionViewDidLoad() {
      this.loadMap();
    console.log('ionViewDidLoad price modal')
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  getCurrentPosition(){

  }

  loadMap(){
    let latLng = new google.maps.LatLng(-34.9290, 138.6010)
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addPrice(){


  }

}
