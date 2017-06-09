import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ViewController, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { MainService } from '../../../providers/main';
import {Observable} from 'rxjs/Rx';
import { ProductPage } from '../../product/product';

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
  price: any = {
    price: 0,
    location: "",
    store_name: "",
    longitude: 0,
    latitude: 0
  }
  error: string = "" ;
  marker: any = {}

  constructor(private mainService: MainService, private http:Http,  public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    console.log(navParams.get('product_id'))
  }

  ionViewDidLoad() {
      this.loadMap();
    console.log('ionViewDidLoad price modal')
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  loadMap(){

    navigator.geolocation.getCurrentPosition((position)=>{
      this.setLocation(position.coords.latitude, position.coords.longitude);

      let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      // setting the marker on the map
      this.marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        draggable: true
      });
      this.addMarkerListener()
    },(err)=>{
      console.log(err);
    })


  }
  // upate the location on marker drag
  addMarkerListener(){

    this.marker.addListener('dragend',()=> {
      console.log('end drag')
      let latitude = this.marker.getPosition().lat();
      let longitude = this.marker.getPosition().lng();

      this.setLocation(latitude, longitude)
    });

  }

  // sets the location address
  setLocation(latitude, longitude){
    let locationUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true'

    this.http.get(locationUrl).subscribe((res: Response)=>{
      let response = res.json() ;
      this.price.location = response.results[0].formatted_address;
      this.price.longitude = longitude;
      this.price.latitude = latitude;

    })

  }

  addPrice(){

    console.log(this.price)
    this.mainService.addPrice(this.navParams.get('product_id'), this.price)
    .then(obs => {

      obs
      .catch((error:any)=>{
            console.log( 'fail', error);
            this.error= error._body;
            return  Observable.throw( 'An input is missing')}

          )
        .subscribe((data) => {
          console.log('success', data);
          this.dismiss();
          this.navCtrl.push(ProductPage, this.navParams.get('product_id'));
        })

    })
  }

}
