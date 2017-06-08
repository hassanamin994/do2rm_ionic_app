import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class AuthenticationService {
  constructor(private storage: Storage) {  }

  login(access_token, user){
    this.storage.set('access_token',access_token);
    this.storage.set('user', user)
  }

  isLoggedIn(){
    return this.storage.keys().then(res => {
      if(res.indexOf('access_token') != -1)
        return true;
      else
        return false;
    })
  }

  logout(){
    if(this.isLoggedIn()){
      this.storage.remove('access_token');
      this.storage.remove('user');
    }
  }

  isLoggedOut(){
    return !this.isLoggedIn()
  }

}
