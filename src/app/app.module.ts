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
import { PriceModal } from '../pages/product-details/price-modal/price-modal';
import { ListPage } from '../pages/list/list';
import { GoogleMaps } from '@ionic-native/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    PriceModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    PriceModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
