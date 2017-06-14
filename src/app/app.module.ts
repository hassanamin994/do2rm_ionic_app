import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { ChartPage } from '../pages/chart/chart';
import { ProductCard } from '../pages/product-card/product-card';
import { ProductComments } from '../pages/product-comments/product-comments';
import { ProductDetails } from '../pages/product-details/product-details';
import { ProductPrices } from '../pages/product-prices/product-prices';
import { ModalAutocompleteItems } from '../pages/product-details/price-modal/modal-autocomplete-items/modal-autocomplete-items';
import { ProductChart } from '../pages/product-chart/product-chart';
import { ProductNewPage } from '../pages/product-new/product-new';
import { ProductPriceCardPage } from '../pages/product-price-card/product-price-card';
import { PriceModal } from '../pages/product-details/price-modal/price-modal';
import { UserPage } from '../pages/user/user';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { SearchPage } from '../pages/search/search';
import { SearchBarPage } from '../pages/search-bar/search-bar';
import { ListPage } from '../pages/list/list';
import { GoogleMaps } from '@ionic-native/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Facebook } from '@ionic-native/facebook';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {IonicStorageModule} from '@ionic/storage';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { AuthenticationService } from '../authentication.service';
import {MainService} from '../providers/main'

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
    LoginPage,
    SearchPage,
    SearchBarPage,
    ProductNewPage,
    ProductPriceCardPage,
    ChartPage,
    LogoutPage,
    ModalAutocompleteItems
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
    LoginPage,
    SearchPage,
    SearchBarPage,
    ProductNewPage,
    ProductPriceCardPage,
    ChartPage,
    LogoutPage,
    ModalAutocompleteItems

  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    BarcodeScanner,
    Facebook,
    Camera,
    SpeechRecognition,
    AuthenticationService,
    MainService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
