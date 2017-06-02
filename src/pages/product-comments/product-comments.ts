import { Component, Input, Output , EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductComments page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-comments',
  templateUrl: 'product-comments.html',
})
export class ProductComments {
  
  @Input() comments: any;
  @Output() commentAdded = new EventEmitter<string>();
  
  newComment: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductComments');
    console.log(this.comments);
  }

  addComment(){
  	let comment = this.newComment.trim()
  	if(comment){
	  	this.commentAdded.emit(comment);
  	}
  }

}
