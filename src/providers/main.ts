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
  
  login(data){
    let headers=new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.domain+"/api/user_token",data,{headers:headers}).map(res=>res.json());
  }
  register(data){
    let headers=new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.domain+"/api/users",data,{headers:headers}).map(res=>res.json());

  }
  async sendcode(data){
    let headers=await this.setheader();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.domain+"/api/students/"+data+"/attendances",'',{headers:headers}).map(res=>res.json());
      
  }
  
  async getmaxgrade(){
    let headers=await this.setheader();
  
    return this.http.get(this.domain+"/api/max/absence/points",{headers:headers})
      .map(res=>res.json())
      .catch((error:any)=>{console.log(error);return Observable.throw(error || 'Server error')});
  }


  async setheader(){
    let token = await this.storage.get('token')
    return new Headers ({ 'Authorization': token });
  }



}
