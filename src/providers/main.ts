import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Storage } from '@ionic/storage';


@Injectable()
export class MainService {
  headers:Headers
  domain='https://do2rom.herokuapp.com'
  constructor(public http: Http,public storage: Storage) {
    console.log('Hello main Provider');
  }
  async setheader(){
    let token = await this.storage.get('token')
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsiJG9pZCI6IjU5M2I4NjM1YTA0NDRmMDAwNDI5NTBiMCJ9fQ.ZAJW-BtY8Qm_OeLenGWdQbep78-5OpA6OW6sD3iY2KY';
    let headers = new Headers ({ 'Authorization': token });
    headers.append( 'Content-Type', 'application/json' );
    return headers;
  }
  
  login(data){
    let headers=new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.domain+"/api/user_token",data,{headers:headers}).map(res=>res.json());
  }
  
  register(data){
    let headers=new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.domain+"/api/users",data,{headers:headers}).map(res=>res.json());

  }
  
  // add a product 
  async addProduct(product){
    let headers=await this.setheader();
    let data = {product: product};
    return this.http.post(this.domain+"/api/products",data,{headers:headers}).map(res=>res.json());
  }
  
  // add a price to a product 
  async addPrice(product_id, price){
    let headers=await this.setheader();
    let newPrice = {location: price.store_name + " " + price.location, price: price.price, image: price.image}
    return this.http.post(this.domain + "/api/products/" + product_id + "/prices" ,{price: newPrice},{headers:headers}).map(res=>res.json());

  }
  
  // gets products
  async getProducts(){
    let headers=await this.setheader();
    return this.http.get(this.domain + "/api/products/",{headers:headers}).map(res=>res.json());
  }
  
  // gets a product 
  async getProduct(id){
    let headers=await this.setheader();
    return this.http.get(this.domain + "/api/products/" + id, {headers:headers}).map(res=>res.json());
  }
  // gets a product 
  async getPrice(id){
    let headers=await this.setheader();
    return this.http.get(this.domain + "/api/prices/" + id, {headers:headers}).map(res=>res.json());
  }

  // confirms a price 
  async confirmPrice(price_id){
    let headers=await this.setheader();
    return this.http.post(this.domain + "/api/prices/" + price_id + "/confirm" ,{},{headers:headers}).map(res=>res.json());

  }
   // gets products
  async getComments(product_id){
    let headers=await this.setheader();
    return this.http.get(this.domain + "/api/products/" + product_id + "/comments/" ,{headers:headers}).map(res=>res.json());
  }

  //adds a comment
  async addComment(product_id, comment){
    let headers = await this.setheader();
    let newComment = {body: comment}
    return this.http.post(this.domain + "/api/products/" + product_id + "/comments/" ,{comment: newComment},{headers:headers}).map(res=>res.json());

  }
  
  async searchByWord(query){
    // api/products/search/
    let headers=await this.setheader();
    return this.http.get(this.domain + "/api/products/search/" + query, {headers:headers}).map(res=>res.json());
  }
  async searchByBarCode(barcode){
    // api/products/search/
    let headers=await this.setheader();
    return this.http.get(this.domain + "/api/products/searchqr/" + barcode, {headers:headers}).map(res=>res.json());
  }
  
  // disconfirms a price 
  async disconfirmPrice(price_id){
    let headers=await this.setheader();
    return this.http.post(this.domain + "/api/prices/" + price_id + "/disconfirm" ,{},{headers:headers}).map(res=>res.json());

  }



  async getUserid(){
    let user_id = await this.storage.get('user_id');
    user_id = "593b8635a0444f00042950b0";
    return user_id
  }
  async getUserInfo(){
    let headers=await this.setheader();
    return this.http.get(this.domain + "/api/my_info/" , {headers:headers}).map(res=>res.json());
  }







}
