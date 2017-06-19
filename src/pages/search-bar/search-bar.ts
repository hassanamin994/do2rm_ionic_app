import { Component, Input ,Output, EventEmitter} from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SearchPage } from '../search/search';
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
	public toggled: boolean;
	speechRecognitionSubscribtion: any ;
	@Input() searchText: string = "" ;
	@Output() search_emit: EventEmitter<any> = new EventEmitter<any>();
	constructor(public viewCtrl: ViewController, private speechRecognition: SpeechRecognition, private alertCtrl: AlertController, public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchBarPage');
	}
	openBarcodeSearch(){
	    this.barcodeScanner.scan().then((barcodeData) => {
	     // Success! Barcode data is here
	     this.showAlert("Barcode data", JSON.stringify(barcodeData));
	     if(!barcodeData.cancelled){
	     	this.searchText = barcodeData.text;
	     	if (this.viewCtrl.name == 'HomePage')
	     		this.navCtrl.push(SearchPage, {search: {by: "barcode", barcode: barcodeData.text}})
	     	else
	     		this.search_emit.emit({by: "barcode", barcode: barcodeData.text});	
	     }
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
	        (matches: Array<string>) => {
			     	this.searchText = matches[0];
			     	if (this.viewCtrl.name == 'HomePage')
			     		this.navCtrl.push(SearchPage, {search: {by: "voice", text: matches[0]}})
			     	else
			     		this.search_emit.emit({by: "voice", text: matches[0]});
	        },
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
	  search(){
	  	console.log('search input')
	  	if (this.viewCtrl.name != 'SearchPage')
	    	this.navCtrl.push(SearchPage, {search: {by: "voice", text: this.searchText }})
	    else
	    	this.search_emit.emit({by: "voice", text: this.searchText });
	  }

	  toggleSearch() {
       this.toggled = this.toggled ? false : true;
    	}


}
