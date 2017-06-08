import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

/**
 * Generated class for the SearchBarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-search-bar',
  templateUrl: 'search-bar.html',
})
export class SearchBarPage {
	speechRecognitionSubscribtion: any ;
	constructor(private speechRecognition: SpeechRecognition, private alertCtrl: AlertController, public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchBarPage');
	}
	openBarcodeSearch(){
	    this.barcodeScanner.scan().then((barcodeData) => {
	     // Success! Barcode data is here
	     this.showAlert("Barcode data", JSON.stringify(barcodeData));
	    }, (err) => {
	        // An error occurred
	        console.log(err);
	        this.showAlert('barcode error', JSON.stringify(err));
	    });
	  }

	  startRecording(){
	    this.speechRecognition.isRecognitionAvailable()
	    .then((available: boolean) => {
	      if(available){
	        // check for permissions
	        if(this.checkVoiceRecognetionPermission()){
	          // start performing the record 
	          this.startListening()

	        }else{
	          // request permissions
	          this.requestVoiceRecognetionPermission();
	        }
	      }else{
	        this.showAlert('voice recognition',"Voice recognitions isnt available");
	      }

	    })

	    console.log('recording');

	  }

	  startListening(){
	     this.speechRecognitionSubscribtion =  this.speechRecognition.startListening()
	      .subscribe(
	        (matches: Array<string>) => this.showAlert('matches',JSON.stringify(matches)),
	        (onerror) => console.log('error:', onerror)
	      )
	  }

	  requestVoiceRecognetionPermission(){
	    this.speechRecognition.requestPermission()
	      .then(
	        () => this.showAlert("Permissions","Permission granted successfully!") ,
	        () => this.showAlert("Permissions","Permission denied!")
	      )
	  }
	  checkVoiceRecognetionPermission(){

	    return this.speechRecognition.hasPermission()
	    .then((hasPermission: boolean) => {
	      return hasPermission;
	    })

	  }



	  stopRecording(){
	    console.log('stopping ')
	    this.speechRecognitionSubscribtion.unsubscribe();
	  }

	  showAlert(heading, body){
	    let alert = this.alertCtrl.create({
	      title: heading,
	      subTitle: body,
	      buttons: ['Dismiss']
	      });
	    alert.present();
	  }
	  search(event){
	    alert(event)
	  }


}
