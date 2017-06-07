import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { ProductCard } from '../pages/product-card/product-card';
import { ProductComments } from '../pages/product-comments/product-comments';
import { ProductDetails } from '../pages/product-details/product-details';
import { ProductPrices } from '../pages/product-prices/product-prices';
import { ProductChart } from '../pages/product-chart/product-chart';
import { PriceModal } from '../pages/product-details/price-modal/price-modal';
import { UserPage } from '../pages/user/user';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { GoogleMaps } from '@ionic-native/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Facebook } from '@ionic-native/facebook';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProductPage,
    ProductCard,
    ProductComments,
    ProductDetails,
    ProductPrices,
    PriceModal,
    ProductChart,
    UserPage,
    RegistrationPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProductPage,
    ProductCard,
    ProductComments,
    ProductDetails,
    ProductPrices,
    PriceModal,
    ProductChart,
    UserPage,
    RegistrationPage,
    LoginPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    BarcodeScanner,
    Facebook,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
