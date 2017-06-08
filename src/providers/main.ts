import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Storage } from '@ionic/storage';


@Injectable()
export class MainService {
  headers:Headers
  domain='https:https://do2rom.herokuapp.com'
  constructor(public http: Http,public storage: Storage) {
    console.log('Hello main Provider');
  }
  login(loginInfo){
  	// return new Observable();
  }

}
