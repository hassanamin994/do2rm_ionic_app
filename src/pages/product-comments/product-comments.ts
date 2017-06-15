import { Component, Input, Output , EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainService } from '../../providers/main';

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
  @Input() product_id: any;
  newComment: string = "";
  constructor(private mainService: MainService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductComments');
    console.log(this.comments);
  }

  addComment(){
  	let comment = this.newComment.trim()
  	if(comment){
      this.mainService.addComment(this.product_id, comment)
      .then(obs => {
        obs.subscribe( res =>{
          console.log(res);
          this.refreshComments();
        })
      })
  	}
  }

  refreshComments(): void{
    this.mainService.getComments(this.product_id)
    .then(obs => {
      obs.subscribe(comments => {
        console.log(comments);
        this.comments = comments;
        this.newComment = "";
      })
    })
  }

}
