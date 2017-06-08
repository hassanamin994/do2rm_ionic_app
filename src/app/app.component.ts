import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductPage } from '../pages/product/product';
import { UserPage } from '../pages/user/user';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { AuthenticationService } from '../authentication.service';
import {Storage} from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RegistrationPage;

  pages: Array<{title: string, component: any}>;

  constructor(private storage: Storage, private authenticationService: AuthenticationService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Register', component: RegistrationPage },
      { title: 'Login', component: LoginPage },
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Product', component: ProductPage },
      { title: 'Profile', component: UserPage }
    ];
    this.storage.keys().then(res => {
      if(res.indexOf('access_token') == -1){
        this.rootPage = RegistrationPage;
        console.log(res.indexOf('access_token'))
      }
      else
        this.rootPage = HomePage;
    })
    if(authenticationService.isLoggedIn()){
      this.rootPage = HomePage;
    }
    console.log(authenticationService.isLoggedIn(), 'is logged in ')

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
