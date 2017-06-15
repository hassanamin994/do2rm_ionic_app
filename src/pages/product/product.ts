import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams, Loading, LoadingController, MenuController } from 'ionic-angular';
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
  loading: Loading;
  icons: any = "overview" ;
  @ViewChild('mySlider') slider: Slides;
  slides: any; 
  selectedSegment: string;

  constructor(private menuCtrl: MenuController, private mainService: MainService, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
      menuCtrl.enable(true);  

      this.selectedSegment = 'overview';
      this.slides = [
        {
          id: "overview",
        },
        {
          id: "prices",
        },
        {
          id: "comments",
        }
      ];

  }

  onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.selectedSegment = this.slides[selectedIndex].id;
    this.icons = this.slides[selectedIndex].id;

    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    console.log('Slide changed', slider);
    if(slider._activeIndex >= 0 && slider._activeIndex < this.slides.length ){
      if(slider._activeIndex < this.slides.length){
        var currentSlide = this.slides[slider._activeIndex];
      }
      if(currentSlide){
        this.selectedSegment = currentSlide.id;
        this.icons = currentSlide.id;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Product');
    // get product from api by id
    let id = this.navParams.get('product_id');

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();
    this.mainService.getProduct(id)
    .then( obs => {
      obs.subscribe(product => {
        loading.dismiss()
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
