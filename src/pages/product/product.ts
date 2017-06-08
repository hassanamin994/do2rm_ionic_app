import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

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
  icons: any = "overview" ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    let headers=new Headers ({ "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTY4MDY0OTYsInN1YiI6eyIkb2lkIjoiNTkzMzEzMjE2NDRkMWU1ZmM1OWE0OWQwIn19.IVW5AhLzZmk_OKMIwazl3JqafLI_BXZ1jBe7kKU8Op4" });
    this.http.post("https://do2rom.herokuapp.com/api/user_token",{"auth": {"email": "r@a.com", "password": "pass"}},{headers:headers}).map(res=>res.json())
    .catch((error:any)=>{console.log(JSON.stringify(error));return  Observable.throw(error.json().error || 'Server error')})
    .subscribe((data)=>{alert(JSON.stringify(data)); console.log(data)});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Product');
    // get product from api by id
    let id = this.navParams.get('product_id');
    this.product = {  
      id:1,
      name:" Product 1 ",
      imageUrl:"https://dummyimage.com/600x400/000/fff",
      confirms: 15,
      fakes: 5,
      prices:  [
        {
          id:1,
          price:500,
          confirm:15,
          disconfirm:22,
          location:' 22 masr helwan el zra3y',
          image:'https://dummyimage.com/600x400/000/fff',
          username:'Ahmed'
        },
        {
          id:1,
          price:300,
          confirm:5,
          disconfirm:2,
          location:' 22 masr helwan el zra3y',
          image:'https://dummyimage.com/600x400/000/fff',
          username:'Mahmoud'
        },
        {
          id:1,
          price:200,
          confirm:115,
          disconfirm:222,
          location:' 22 masr helwan el zra3y',
          image:'https://dummyimage.com/600x400/000/fff',
          username:'Ali'
        }
        ],
        comments: [
          {
            username: 'Ahmed',
            user_image: 'https://dummyimage.com/600x400/000/fff',
            body: 'This is a dummy comment'
          },
          {
            username: 'Ali',
            user_image: 'https://dummyimage.com/600x400/000/fff',
            body: 'This is a dummy comment'
          },
          {
            username: 'Hassan',
            user_image: 'https://dummyimage.com/600x400/000/fff',
            body: 'This is a dummy comment'
          },

        ]
    }
  }
  
  logSegment(){
  	console.log(this.icons);
  	
  }

  onAddComment(comment: string){
    // make request to add comment here
    console.log(comment, 'from product ts ');
  }

}
