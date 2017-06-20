import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, AlertController, ViewController, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { MainService } from '../../../providers/main';
import {Observable} from 'rxjs/Rx';
import { ProductPage } from '../../product/product';
import { LoadingController } from 'ionic-angular';
import { ModalAutocompleteItems } from './modal-autocomplete-items/modal-autocomplete-items';

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
  loading: any;
   address:any = {
        place: '',
        set: false,
    };
    placesService:any;
    markers = [];
    placedetails: any;
  constructor( public modalCtrl: ModalController, private loadingCtrl: LoadingController, private mainService: MainService, private http: Http,  public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    console.log(navParams.get('product_id'))
  }

  ionViewDidEnter() {
      this.loadMap();
     this.initPlacedetails();
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
      this.showAlert('Error', 'An error has occured while trying to get your location, Please make sure you have internet connection and enabled GPS');
    }, {timeout:7000})


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
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      obs
      .catch((error:any)=>{
            console.log( 'fail', error);
            this.error=  error._body;
            // this.showAlert('image base64', JSON.stringify(error));
            this.loading.dismiss();
            return  Observable.throw( 'An input is missing')}
          )
        .subscribe((data) => {
          console.log('success', data);
          this.loading.dismiss();
          
          //this.viewCtrl.dismiss();
          this.navCtrl.setRoot(ProductPage, {product_id: this.navParams.get('product_id')});
        })

    })
  }
  
  openLocationSelectionModal(){
    // reset 
        this.reset();
        // show modal|
        let modal = this.modalCtrl.create(ModalAutocompleteItems);
        modal.onDidDismiss(data => {
            console.log('page > modal dismissed > data > ', data);
            if(data){
                this.price.location = data.description;
                // get details
                this.getPlaceDetail(data.place_id);
            }                
        })
        modal.present();
    }

    private reset() {
        this.initPlacedetails();
        this.address.place = '';
        this.address.set = false;
    }

  private getPlaceDetail(place_id:string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                self.placedetails.address = place.formatted_address;
                self.placedetails.lat = place.geometry.location.lat();
                self.placedetails.lng = place.geometry.location.lng();
                for (var i = 0; i < place.address_components.length; i++) {
                    let addressType = place.address_components[i].types[0];
                    let values = {
                        short_name: place.address_components[i]['short_name'],
                        long_name: place.address_components[i]['long_name']
                    }
                    if(self.placedetails.components[addressType]) {
                        self.placedetails.components[addressType].set = true;
                        self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                    }                                     
                }                  
                // set place in map
                self.map.setCenter(place.geometry.location);
                self.createMapMarker(place);
                // populate
                self.address.set = true;
                console.log('page > getPlaceDetail > details > ', self.placedetails);
            }else{
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    }
  private createMapMarker(place:any):void {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: this.map,
        position: placeLoc
      });    
      this.markers.push(marker);
  }
  initPlacedetails(){
     this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            components: {
                route: { set: false, short:'', long:'' },                           // calle 
                street_number: { set: false, short:'', long:'' },                   // numero
                sublocality_level_1: { set: false, short:'', long:'' },             // barrio
                locality: { set: false, short:'', long:'' },                        // localidad, ciudad
                administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido 
                administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia 
                country: { set: false, short:'', long:'' },                         // pais
                postal_code: { set: false, short:'', long:'' },                     // codigo postal
                postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
            }    
        };  
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
