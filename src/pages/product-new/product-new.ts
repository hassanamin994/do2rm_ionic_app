import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PriceModal } from '../product-details/price-modal/price-modal'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {MainService} from '../../providers/main'
import {Observable} from 'rxjs/Rx';
import {Camera, CameraOptions} from '@ionic-native/camera';


/**
 * Generated class for the ProductNewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-new',
  templateUrl: 'product-new.html',
})
export class ProductNewPage {
  product: any = {} ;
  error: string = "" ;
  productsFull = {}; 
  products = []; 
  

  constructor(private loadingCtrl: LoadingController, public mainSrv:MainService,  public alertCtrl: AlertController, private camera: Camera, private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductNewPage');
  }

   searchProduct(searchbar) {
      var name = searchbar.target.value;
      if (name.trim() == '') {
          this.products=[]
      }
      else{
        
        this.mainSrv.searchByWord(name).then( obs =>{
        obs.subscribe(products => {
            this.productsFull = {}
            this.products=[]
            if(products.length > 0){
              products.forEach((i)=>{
                            this.productsFull[i.name]=i.id.$oid
                          })
              this.products = products.map(product => product['name']);
            }
            

            
          })
         }
        );
      }
  }
  selectItem(product){
    this.product.name = product
    this.products = []
  }

  selectImage(){
      console.log('selecting image');
      let alert = this.alertCtrl.create();
      alert.setTitle('Import Image');
      alert.addInput({
        type: 'radio',
        label: 'Gallery',
        value: 'gallary',
        checked: true
      });
      alert.addInput({
        type: 'radio',
        label: 'Camera',
        value: 'camera',
        checked: false
      });

      alert.addButton({
        text: 'OK',
        handler: data => {
          this.openImageSelector(data);
          console.log(data);
        }
      });
      alert.present();
    
  }

  openImageSelector(choice){
    if(choice === 'camera'){
      var sourceType = this.camera.PictureSourceType.CAMERA ;
      console.log('camer chaoice ')
    }
    else{
      console.log('gallary  ')
      var sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    }

    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 150,
      targetHeight: 150
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.image = base64Image;
      // this.showAlert('image base64', base64Image);
    }, (err) => {
    // Handle error
    });

  }

  addProduct(){
  	console.log(this.product.name);
  	// add product to api and get its id 

    if(this.product.name.trim()){
      if(this.productsFull.hasOwnProperty(this.product.name)){
        let modal = this.modalCtrl.create(PriceModal, {product_id: this.productsFull[this.product.name]});
            modal.present();
      }
      else{
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.mainSrv.addProduct(this.product)
        .then((obs)=>{
          obs
          .catch((error:any)=>{
              console.log( error);
              this.error= error._body;
              return  Observable.throw( 'Duplicte product name error')}

            )
          .subscribe((data) => {
            loading.dismiss();
            let modal = this.modalCtrl.create(PriceModal, {product_id: data.id.$oid});
            modal.present();
            console.log(data);
          })
        })
      }
    }

  }
  openBarcodeSearch(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     if(!barcodeData.cancelled){
     	this.product.qr_code = barcodeData.text;
     }
    }, (err) => {
        // An error occurred
        console.log(err);
        // this.showAlert('barcode error', JSON.stringify(err));
    });
  }

}
